import { createAction, handleActions } from 'redux-actions'
// can not use 'aws-sdk'
// the resion is here -> http://andrewhfarmer.com/aws-sdk-with-webpack/
//import 'aws-sdk/dist/aws-sdk'
import 'aws-sdk/dist/aws-sdk'
import { awsAccess, awsSecret, awsBucketName, awsRegion } from '../../config/key.js'
const AWS = window.AWS;
//    var AWS = require('aws-sdk');

// ------------------------------------
// Constants
// ------------------------------------
export const BOOKSHELF_PATH = 'BOOKSHELF_PATH'
export const SELECT_BOOKSHELF = 'SELECT_BOOKSHELF'
export const INVALIDATE_BOOKSHELF = 'INVALIDATE_BOOKSHELF'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS= 'RECEIVE_POSTS'

// ------------------------------------
// Actions
// ------------------------------------
export const dig = createAction(BOOKSHELF_PATH, (value = '->') => value)


function selectedBookshelfPath (bookshelfPath) {
  return {
    type: SELECT_BOOKSHELF_PATH,
    bookshelfPath
  }
}

function receivePosts(bookshelfPath, json) {
  let path = {}
  
  return {
    type: RECEIVE_POSTS,
    bookshelfPath: bookshelfPath,
    posts: json.Contents.map(
      child => { 
        return {
         fullPath: child.Key,
         lastModified: child.LastModified,
         childIndexOf: child.Key.indexOf('matsuno' + bookshelfPath)
        }
      }
//    path: json.Contents.map(
//      child => {
    ),
    directories: json.CommonPrefixes.map(child => child.Prefix),
    receivedAt: Date.now()
  }
}

function requestPosts (bookshelfPath) {
  return {
    type: REQUEST_POSTS,
    bookshelfPath
  }
}

function shouldFetchPosts(state, bookshelfPath) {
  const posts = state.postsByBookshelfPath[bookshelfPath]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(bookshelfPath) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), bookshelfPath)) {
      return dispatch(getS3List(bookshelfPath))
    }
  }
}

function getS3List (bookshelfPath) {
  return dispatch => {
    dispatch(requestPosts(bookshelfPath))

    var s3 = new AWS.S3({ accessKeyId: awsAccess, secretAccessKey: awsSecret, region: awsRegion })
    var defaultPrefix = 'matsuno'
    var params = {
      Bucket: awsBucketName,
      Prefix: defaultPrefix +  bookshelfPath,
      Delimiter : '/'
    }

    s3.listObjects(params, function (err, data) {
      console.dir(data)
      if (err) console.log(err, err.stack) // an error occurred
      else dispatch(receivePosts(bookshelfPath, data))
    })
  }
}

//getS3List('')

// // This is a thunk, meaning it is a function that immediately
// // returns a function for lazy evaluation. It is incredibly useful for
// // creating async actions, especially when combined with redux-thunk!
// // NOTE: This is solely for demonstration purposes. In a real application,
// // you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// // reducer take care of this logic.
// export const doubleAsync = () => {
// //  return (dispatch, getState) => {
// //    setTimeout(() => {
// //      dispatch(increment(getState().counter))
// //    }, 1000)
// //  }
// }
// 
// export const actions = {
//   dig,
//   doubleAsync
// }
// 
// // ------------------------------------
// // Reducer
// // ------------------------------------
// export default handleActions({
//   [BOOKSHELF_PATH]: (state, { payload }) => state + payload
// }, '/')

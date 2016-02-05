import { createAction } from 'redux-actions'
// can not use 'aws-sdk'
// the resion is here -> http://andrewhfarmer.com/aws-sdk-with-webpack/
import 'aws-sdk/dist/aws-sdk'
import {
  INVALIDATE_BOOKSHELF, SELECT_BOOKSHELF_PATH,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../constants/constants'
import { awsAccess, awsSecret, awsBucketName, awsRegion } from '../config/key.js'
const AWS = window.AWS

function formatS3Obj (bookshelfPath, json) {
  return {
    bookshelfPath: bookshelfPath,
    posts: json.Contents.map(
      child => {
        return {
          fullPath: child.Key,
          lastModified: child.LastModified,
          childIndexOf: child.Key.indexOf('matsuno' + bookshelfPath)
        }
      }
    ),
    directories: json.CommonPrefixes.map(child => child.Prefix),
    receivedAt: Date.now()
  }
}

export function fetchByPath (state = {}, action) {
  console.dir('fetch チェック')
  console.dir(action)
  switch (action.type) {
    case INVALIDATE_BOOKSHELF:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.payload.bookshelfPath]:
          Object.assign(
            {},
            state[action.payload.bookshelfPath], {
              isFetching: true,
              didInvalidate: false
            })
      })
    default:
      return state
  }
}

function shouldFetchPosts (state, bookshelfPath) {
  const posts = fetchByPath[bookshelfPath]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded (bookshelfPath) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), bookshelfPath)) {
      return dispatch(getS3List(bookshelfPath))
    }
  }
}

function getS3List (bookshelfPath) {
  return dispatch => {
    dispatch(requestPosts(bookshelfPath))

    let s3 = new AWS.S3({ accessKeyId: awsAccess, secretAccessKey: awsSecret, region: awsRegion })
    let defaultPrefix = 'matsuno'
    let params = {
      Bucket: awsBucketName,
      Prefix: defaultPrefix + bookshelfPath,
      Delimiter: '/'
    }

    s3.listObjects(params, function (err, data) {
      console.dir('get s3 list raw data')
      console.dir(data)
      if (err) console.log(err, err.stack) // an error occurred
      else dispatch(receivePosts(bookshelfPath, data))
    })
  }
}

export const receivePosts = createAction(RECEIVE_POSTS, formatS3Obj)
export const requestPosts = createAction(REQUEST_POSTS, bookshelfPath => bookshelfPath)
export const selectedBookshelfPath = createAction(SELECT_BOOKSHELF_PATH, bookshelfPath => bookshelfPath)

export const actions = {
  receivePosts,
  requestPosts,
  selectedBookshelfPath
}

import { createAction } from 'redux-actions'
import path from 'path'
// can not use 'aws-sdk'
// the resion is here -> http://andrewhfarmer.com/aws-sdk-with-webpack/
import 'aws-sdk/dist/aws-sdk'
import {
  INVALIDATE_BOOKSHELF, SELECT_BOOKSHELF_PATH,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../constants/constants'
import { awsAccess, awsSecret, awsBucketName, awsRegion } from '../config/key.js'
const AWS = window.AWS

const formatS3Obj = (bookshelfPath, json) => {
  return {
  files: json.Contents.map(
    child => {
      return {
        fullPath: path.resolve(child.Key).split('/').pop(),
        lastModified: child.LastModified,
        childIndexOf: child.Key.indexOf('matsuno' + bookshelfPath)
      }
    }
  ),
  justUnder: json.CommonPrefixes.map(child => path.resolve(child.Prefix).split('/').pop()),
  receivedAt: Date.now(),
  bookshelfPath: bookshelfPath
  }
}

function shouldFetchPosts (state, bookshelfPath) {
  console.dir('----start shouldFetchPosts-----')
  console.dir(state)
  console.dir(bookshelfPath)
  const posts = state.bookshelf[bookshelfPath]
  console.dir(posts)
  console.dir('----end shouldFetchPosts-----')
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded (bookshelfPath) {
  console.dir(bookshelfPath)
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
      Prefix: (defaultPrefix + bookshelfPath).replace(/\/?$/, '/'),
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

const bookshelfPathObj = (bp) => {
  return {
    bookshelfPath: bp,
    isiPdf: path.extname(bp) === 'pdf'
  }
}

export const requestPosts = createAction(REQUEST_POSTS, bookshelfPathObj )
export const receivePosts = createAction(RECEIVE_POSTS, formatS3Obj)
export const selectedBookshelfPath = createAction(SELECT_BOOKSHELF_PATH, bookshelfPathObj)

export const actions = {
  fetchPostsIfNeeded,
  receivePosts,
  requestPosts,
  selectedBookshelfPath
}



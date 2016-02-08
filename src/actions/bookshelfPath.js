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

const formatS3List = (bookshelfPath, json) => {
  return {
  files: json.Contents.map(
    child => {
      return {
        fullPath: path.resolve(child.Key).split('/').pop(),
        lastModified: child.LastModified
      }
    }
  ),
  justUnder: json.CommonPrefixes.map(child => path.resolve(child.Prefix).split('/').pop()),
  receivedAt: Date.now(),
  bookshelfPath: bookshelfPath
  }
}

const formatS3Obj = (bookshelfPath, json) => {
  return {
    fileContent: {
      body: json.Body,
      lastModified: json.LastModified,
      contentType: json.ContentType,
      contentLength: json.ContentLength,
    },
    bookshelfPath: bookshelfPath,
    receivedAt: Date.now(),
  }
}

function shouldFetchPosts (state, bookshelfPath) {
  const posts = state.bookshelf[bookshelfPath]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded (bookshelfPath, isFile) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), bookshelfPath)) {
      if (isFile) {
        return dispatch(getS3Obj(bookshelfPath))
      }else{  
        return dispatch(getS3List(bookshelfPath))
      }
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
      if (err) console.log(err, err.stack) // an error occurred
      else dispatch(receivePosts(bookshelfPath, data, false))
    })
  }
}

function getS3Obj (bookshelfPath) {
  return dispatch => {
    dispatch(requestPosts(bookshelfPath))

    let s3 = new AWS.S3({ accessKeyId: awsAccess, secretAccessKey: awsSecret, region: awsRegion })
    let defaultPrefix = 'matsuno'
    let s3Key = defaultPrefix + bookshelfPath
    let params = {
      Bucket: awsBucketName,
      Key: s3Key
    }

    s3.getObject(params, function (err, data) {
      if (err) console.log(err, err.stack) // an error occurred
      else dispatch(receivePosts(bookshelfPath, data, true))
    })
  }
}

const bookshelfPathObj = (bp) => {
  return {
    bookshelfPath: bp,
    isFile: path.extname(bp).length > 0
  }
}

const formatS3 = (bookshelfPath, json, isFile) => {
  if (isFile) {
    return formatS3Obj(bookshelfPath, json)
  }else{
    return formatS3List(bookshelfPath, json)
  }
}

export const requestPosts = createAction(REQUEST_POSTS, bookshelfPathObj )
export const receivePosts = createAction(RECEIVE_POSTS, formatS3)
export const selectedBookshelfPath = createAction(SELECT_BOOKSHELF_PATH, bookshelfPathObj)

export const actions = {
  fetchPostsIfNeeded,
  receivePosts,
  requestPosts,
  selectedBookshelfPath
}

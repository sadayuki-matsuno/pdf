import { createAction } from 'redux-actions'
import path from 'path'
// can not use 'aws-sdk'
// the resion is here -> http://andrewhfarmer.com/aws-sdk-with-webpack/
import 'aws-sdk/dist/aws-sdk'
import {
  SELECT_BOOKSHELF_PATH,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../constants/constants'
import { awsBucketName } from '../config/config.js'
const AWS = window.AWS

const formatS3List = (bookshelfPath, json) => ({
  files: json.Contents.filter(child => {
    return (child.Key.slice(-1) !== '/')
  }).map(child => {
    return {
      name: path.resolve(child.Key).split('/').pop(),
      lastModified: child.LastModified
    }
  }),
  dirs: json.CommonPrefixes.map(child => ({
    name: path.resolve(child.Prefix).split('/').pop()
  })),
  receivedAt: Date.now(),
  bookshelfPath: bookshelfPath
})

const formatS3Url = (bookshelfPath, url) => ({
  fileUrl: url,
  bookshelfPath: bookshelfPath,
  receivedAt: Date.now()
})

const shouldFetchPosts = (state, bookshelfPath) => {
  const posts = state.bookshelf[bookshelfPath]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = (bookshelfPath, isFile) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), bookshelfPath)) {
      return isFile
        ? dispatch(getS3Url(getState(), bookshelfPath))
        : dispatch(getS3List(getState(), bookshelfPath))
    }
  }
}

const getS3List = (state, bookshelfPath) => {
  return dispatch => {
    dispatch(requestPosts(bookshelfPath))

    AWS.config.update(state.auth.awsConfig)
    let s3 = new AWS.S3()
    let params = {
      Bucket: awsBucketName,
      Prefix: (state.auth.cognitoId + bookshelfPath).replace(/\/?$/, '/'),
      Delimiter: '/'
    }

    s3.listObjects(params, function (err, data) {
      if (err) console.log(err, err.stack) // an error occurred
      else dispatch(receivePosts(bookshelfPath, data, false))
    })
  }
}

const getS3Url = (state, bookshelfPath) => {
  return dispatch => {
    dispatch(requestPosts(bookshelfPath))

    AWS.config.update(state.auth.awsConfig)
    let s3 = new AWS.S3()
    let s3Key = state.auth.cognitoId + bookshelfPath
    let params = {
      Bucket: awsBucketName,
      Key: s3Key,
      Expires: 300
    }

    s3.getSignedUrl('getObject', params, function (err, url) {
      if (err) console.log(err, err.stack) // an error occurred
      else dispatch(receivePosts(bookshelfPath, url, true))
    })
  }
}

const pathObj = bp => ({
  bookshelfPath: bp,
  isFile: path.extname(bp).length > 0
})

const formatS3 = (bookshelfPath, data, isFile) => {
  return isFile
    ? formatS3Url(bookshelfPath, data)
    : formatS3List(bookshelfPath, data)
}

export const requestPosts = createAction(REQUEST_POSTS, pathObj)
export const receivePosts = createAction(RECEIVE_POSTS, formatS3)
export const selectedPath = createAction(SELECT_BOOKSHELF_PATH, pathObj)

export const actions = {
  fetchPostsIfNeeded,
  receivePosts,
  requestPosts,
  selectedPath
}

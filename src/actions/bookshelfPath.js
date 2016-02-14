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

export const fetchPostsIfNeeded = (bookshelfPath, isFile = false) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), bookshelfPath)) {
      return dispatch(getS3List(getState(), bookshelfPath))
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

const pathObj = bp => ({
  bookshelfPath: bp,
  isFile: path.extname(bp).length > 0
})

export const requestPosts = createAction(REQUEST_POSTS, pathObj)
export const receivePosts = createAction(RECEIVE_POSTS, formatS3List)
export const selectedPath = createAction(SELECT_BOOKSHELF_PATH, pathObj)

export const actions = {
  fetchPostsIfNeeded,
  receivePosts,
  requestPosts,
  selectedPath
}

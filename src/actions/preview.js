import { createAction } from 'redux-actions'
import path from 'path'
// can not use 'aws-sdk'
// the resion is here -> http://andrewhfarmer.com/aws-sdk-with-webpack/
import 'aws-sdk/dist/aws-sdk'
import { REQUEST_URL, RECEIVE_URL } from '../constants/constants'
import { awsBucketName } from '../config/config.js'
const AWS = window.AWS

const formatS3Url = (bookshelfPath, url) => ({
  fileUrl: url,
  bookshelfPath: bookshelfPath,
  receivedAt: Date.now()
})

const shouldGetUrl = (state, bookshelfPath) => {
  // TODO 有効期限をすぎてたらという処理を入れたい
  return true
}

export const getUrlIfNeeded = (bookshelfPath) => {
  return (dispatch, getState) => {
    if (shouldGetUrl(getState(), bookshelfPath)) {
      return dispatch(getS3Url(getState(), bookshelfPath))
    }
  }
}

const getS3Url = (state, bookshelfPath) => {
  return (dispatch) => {
    dispatch(requestUrl(bookshelfPath))

    AWS.config.update(state.auth.awsConfig)
    let s3 = new AWS.S3()
    let s3Key = state.auth.cognitoId + bookshelfPath
    let params = {
      Bucket: awsBucketName,
      Key: s3Key,
      Expires: 1800
    }

    s3.getSignedUrl('getObject', params, function (err, url) {
      if (err) console.log(err, err.stack) // an error occurred
      else dispatch(receiveUrl(bookshelfPath, url, true))
    })
  }
}

const pathObj = (bp) => ({
  bookshelfPath: bp,
  isFile: path.extname(bp).length > 0
})

export const requestUrl = createAction(REQUEST_URL, pathObj)
export const receiveUrl = createAction(RECEIVE_URL, formatS3Url)

export const actions = {
  getUrlIfNeeded,
  receiveUrl,
  requestUrl
}

import { createAction } from 'redux-actions'
// can not use 'aws-sdk'
// the resion is here -> http://andrewhfarmer.com/aws-sdk-with-webpack/
import 'aws-sdk/dist/aws-sdk'
import {
  IS_VALID_FB_AUTH, IS_INVALID_FB_AUTH, REQUEST_AUTH
} from '../constants/constants'
import { awsIdentityPoolId, awsRegion } from '../config/config.js'
const AWS = window.AWS

export const cognitoAuth = (fbToken) => {
  return (dispatch) => {
    dispatch(requestAuth())
    let creds = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: awsIdentityPoolId,
      Logins: {
        'graph.facebook.com': fbToken
      }
    })

    let awsConfig = {
      region: awsRegion,
      credentials: creds
    }

    AWS.config.update(awsConfig)
    AWS.config.credentials.get(function (err) {
      if (!err) {
        let cognitoId = AWS.config.credentials.identityId
        dispatch(isValidFbAuth(awsConfig, cognitoId))
      } else {
        // TODO エラーメッセージの処理
        dispatch(isInvalidFbAuth())
      }
    })
  }
}

export const shouldAuth = (auth) => {
  if (!auth) {
    return true
  }
  if (auth.isChecking) {
    return false
  }
  if (!auth.valid) {
    return true
  }
  return !(auth.cognitoId && auth.awsConfig)
}

export const isValidFbAuth = createAction(IS_VALID_FB_AUTH, (c, i) => ({ awsConfig: c, cognitoId: i }))
export const isInvalidFbAuth = createAction(IS_INVALID_FB_AUTH)
export const requestAuth = createAction(REQUEST_AUTH)

export const actions = {
  cognitoAuth,
  isValidFbAuth,
  isInvalidFbAuth,
  requestAuth
}

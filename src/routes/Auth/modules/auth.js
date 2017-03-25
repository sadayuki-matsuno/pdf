import { createAction } from 'redux-actions'
// can not use 'aws-sdk'
// the resion is here -> http://andrewhfarmer.com/aws-sdk-with-webpack/
import 'aws-sdk/dist/aws-sdk'
import { awsIdentityPoolId, awsRegion } from '../../../config/config.js'

// ------------------------------------
// Constants
// ------------------------------------

export const IS_VALID_FB_AUTH = 'IS_VALID_FB_AUTH'
export const IS_INVALID_FB_AUTH = 'IS_INVALID_FB_AUTH'
export const REQUEST_AUTH = 'REQUEST_AUTH'

// ------------------------------------
// Actions
// ------------------------------------


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


export const responseFacebook = (response) => {
  return (dispatch) => {
    dispatch(requestAuth())
    if (response.accessToken) {
      dispatch(cognitoAuth(response.accessToken))
    } else if (response.status === 'unknown') {
      // The person is logged into Facebook, but not your app.
      dispatch(isInvalidFbAuth())
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      dispatch(isInvalidFbAuth())
    }
  }
}


export const isValidFbAuth = createAction(IS_VALID_FB_AUTH, (c, i) => ({ awsConfig: c, cognitoId: i }))
export const isInvalidFbAuth = createAction(IS_INVALID_FB_AUTH)
export const requestAuth = createAction(REQUEST_AUTH)

export const actions = {
  cognitoAuth,
  isValidFbAuth,
  isInvalidFbAuth,
  requestAuth,
  responseFacebook
}

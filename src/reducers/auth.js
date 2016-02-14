import { handleActions } from 'redux-actions'

export default handleActions({
  IS_VALID_FB_AUTH: (state, action) => (
    Object.assign({}, state, {
      isChecking: false,
      valid: true,
      cognitoId: action.payload.cognitoId,
      awsConfig: action.payload.awsConfig
    })
  ),
  IS_INVALID_FB_AUTH: (state, action) => (
    Object.assign({}, state, {
      isChecking: false,
      valid: false,
      cognitoId: null,
      awsConfig: null
    })
  ),
  REQUEST_AUTH: (state, action) => (
    Object.assign({}, state, {
      isChecking: true
    })
  )
}, { isChecking: true, valid: false })


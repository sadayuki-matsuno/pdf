import React from 'react'
import { connect } from 'react-redux'
import './Auth.scss'
// import { fbConfig } from '../../config/config.js'
import FacebookLogin from 'react-facebook-login'
import { fbAppId, fbScope } from '../../../config/config.js'
import { shouldAuth } from '../modules/auth'
//import { responseFacebook, hideButtonAttr } from '../modules/auth'

export const hideButtonAttr = (auth) => {
  let defaultClass = 'midium btn btn-default btn-succes '
  return shouldAuth(auth)
    ? defaultClass
    : defaultClass + ' none-login-facebook '
}
 
export const Auth = (props) => (
  <div className='container text-center'>
    <hr />
    <h2>This is Auth page</h2>
    {
     <p>Login by facebook, or you can not use this system.</p> && 
       <FacebookLogin
         appId={fbAppId}
         xfbml
         autoLoad
         scope={fbScope}
         size={hideButtonAttr(props.auth)}
         textButton={'Login by Facebook'}
         callback={props.responseFacebook}
       />
    }
    {props.auth && props.auth.isChecking && <h2>Auth Checking ...</h2>}
  </div>
)

// Auth.propTypes = {
//   auth: PropTypes.object.isRequired,
//   requestAuth: PropTypes.func.isRequired,
//   isInvalidFbAuth: PropTypes.func.isRequired,
//   cognitoAuth: PropTypes.func.isRequired
// }
export default Auth

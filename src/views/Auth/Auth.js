import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Auth.scss'
import { shouldAuth, actions as mapDispatchToProps } from '../../actions/auth'
// import { fbConfig } from '../../config/config.js'
import FacebookLogin from 'react-facebook-login'
import { fbAppId, fbScope } from '../../config/config.js'

export class Auth extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    requestAuth: PropTypes.func.isRequired,
    isInvalidFbAuth: PropTypes.func.isRequired,
    cognitoAuth: PropTypes.func.isRequired
  };

  responseFacebook = (response) => {
    this.props.requestAuth()
    if (response.accessToken) {
      this.props.cognitoAuth(response.accessToken)
    } else if (response.status === 'unknown') {
      // The person is logged into Facebook, but not your app.
      this.props.isInvalidFbAuth()
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      this.props.isInvalidFbAuth()
    }
  }

  hideButtonAttr = (auth) => {
    let defaultClass = 'midium btn btn-default btn-succes '
    return shouldAuth(auth)
      ? defaultClass
      : defaultClass + classes['none-login-facebook']
  }

  render () {
    const { auth } = this.props
    return (
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
            size={this.hideButtonAttr(auth)}
            textButton={'Login by Facebook'}
            callback={this.responseFacebook}
          />
        }
        { auth.isChecking && <h2>Auth Checking ...</h2> }
      </div>
    )
  }
}

export default connect('', mapDispatchToProps)(Auth)

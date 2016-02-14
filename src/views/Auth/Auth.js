import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import classes from './Auth.scss'
import { shouldAuth, actions as mapDispatchToProps } from '../../actions/auth'
import { fbConfig } from '../../config/config.js'

export class Auth extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    requestAuth: PropTypes.func.isRequired,
    isInvalidFbAuth: PropTypes.func.isRequired,
    cognitoAuth: PropTypes.func.isRequired
  };

  checkFbAuth () {
    this.props.requestAuth()
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        let fbToken = response.authResponse.accessToken
        this.props.cognitoAuth(fbToken)
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        this.props.isInvalidFbAuth()
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        this.props.isInvalidFbAuth()
      }
    })
  }

  componentDidMount () {
    // Load the SDK asynchronously
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = () => {
      FB.init(fbConfig)
      this.checkFbAuth()
    }
  }

  loginFb () {
    FB.login(() => {
      this.checkFbAuth()
    }, { scope: ['public_profile', 'email'] })
  }

  render () {
    const { auth } = this.props
    return (
      <div className='container text-center'>
        <hr />
        <h2>This is Auth page</h2>
        {
         shouldAuth(auth) &&
         <p>Login by facebook, or you can not use this system.</p> &&
         <button
           className={'btn btn-default btn-succes'}
           onClick={() => this.loginFb()}
         >
           FaceBook Login
         </button>
        }
        { auth.isChecking && <h2>Auth Checking ...</h2> }
      </div>
    )
  }
}

export default connect('', mapDispatchToProps)(Auth)

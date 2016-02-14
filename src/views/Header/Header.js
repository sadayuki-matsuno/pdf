import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Image from './logo.png'
import classes from './Header.scss'

const mapStateToProps = (state) => ({
})

export class Header extends React.Component {
  logoClick () {
    location.reload(true)
  }

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
            <img className={classes.logo}
                 src={Image}
                 alt='This is the logo.'
                 onClick={() => this.logoClick()}
            />
          </div>
        </div>
        <h1>Welcome to Matsuno PDF Viewer</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header)

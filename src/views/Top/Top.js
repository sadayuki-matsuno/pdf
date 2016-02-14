import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Top.scss'
import Bookshelf from '../Bookshelf/Bookshelf'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Auth from '../Auth/Auth'

const mapStateToProps = (state) => ({
   auth: state.auth
})

export class Top extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render () {
    const { auth  } = this.props
    return (
      <div>
        <Header />
        { auth && auth.valid ? 
            <Bookshelf /> : 
            <Auth auth={auth}/>
        }
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Top)

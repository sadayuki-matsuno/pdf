import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import './Top.scss'
import Bookshelf from '../../Bookshelf'
import Auth from '../../Auth'
// 
const mapStateToProps = (state) => ({
  auth: state.auth
})

export class Top extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render () {
    const { auth } = this.props
    return (
      <div>
        {auth && auth.valid ? <Bookshelf /> : <Auth auth={auth}/>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Top)



// export const Top = () => (
//   <div>
//     <Auth />
//   </div>
// )

// export default Top

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// TODO 更新日時をデータ取得時のみ更新するようにする
const mapStateToProps = (state) => ({
  dummy: state.bookshelfPath
})

export class Footer extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <hr />
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Footer)

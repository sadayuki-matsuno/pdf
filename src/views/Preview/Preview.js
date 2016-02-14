import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Preview.scss'

function mapStateToProps (state) {
  return {dummy: state.bookshelfPath}
}

export class Preview extends React.Component {
  static propTypes = {
  };

  render () {
    const { fileUrl, lastUpdated } = this.props
    return (
      <div className='container text-center'>
        <hr />
        <h2>This is Preview</h2>
        <a href={fileUrl} target="_blank">This is URL</a>
        <p>This Link will be expired in 5 minites</p>
        { lastUpdated && <p>You got this link at {lastUpdated}</p> }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Preview)

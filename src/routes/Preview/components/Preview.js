import React, { PropTypes } from 'react'
import './Preview.scss'
import { actions as mapDispatchToProps } from '../modules/preview'


export class Preview extends React.Component {
  static propTypes = {
    bookshelfPath: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
    receivedAt: PropTypes.number.isRequired,
    getUrlIfNeeded: PropTypes.func.isRequired
  };

  componentDidMount () {
    let { getUrlIfNeeded, bookshelfPath } = this.props
    getUrlIfNeeded(bookshelfPath)
  }

  onClick = () => {
    let fileUrl = this.props.fileUrl
    window.open(fileUrl, '_blank')
  }

  render () {
    const { receivedAt } = this.props
    return (
      <div className='container text-center'>
        <hr />
        <h2>This is Preview</h2>
        <input
          className='btn btn-danger btn-lg'
          type='button'
          onClick={this.onClick}
          value='Preview NOW'
        />
        {receivedAt && <p>You got this link at {new Date(receivedAt).toLocaleString()}</p>}
        <p>This Link will be expired in 5 minites</p>
      </div>
    )
  }
}

export default Preview

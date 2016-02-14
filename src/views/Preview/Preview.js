import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import classes from './Preview.scss'
import { actions as mapDispatchToProps } from '../../actions/preview'

const mapStateToProps = state => {
  let bookshelfPath = state.bookshelf.bookshelfPath
  let pwd = state.preview[bookshelfPath]

  return {
    bookshelfPath: bookshelfPath,
    fileUrl: !!pwd ? pwd.fileUrl : '',
    receivedAt: !!pwd ? pwd.receivedAt : ''
  }
}

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

  render () {
    const { fileUrl, receivedAt } = this.props
    return (
      <div className='container text-center'>
        <hr />
        <h2>This is Preview</h2>
        <input
          className='btn btn-danger btn-lg'
          type='button'
          onClick={() => window.open(fileUrl, '_blank')}
          value='Preview NOW'
        />
        { receivedAt && <p>You got this link at {new Date(receivedAt).toLocaleString()}</p> }
        <p>This Link will be expired in 5 minites</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)

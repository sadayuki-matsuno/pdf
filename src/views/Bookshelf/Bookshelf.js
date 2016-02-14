import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
import path from 'path'
import Image from './logo.png'
import classes from './Bookshelf.scss'
import BookshelfList from './BookshelfList'
import Footer from '../Footer/Footer'
import Preview from '../Preview/Preview'
import Auth from '../Auth/Auth'

function mapStateToProps (state) {

  const { bookshelf } = state
  const bookshelfPath = bookshelf.bookshelfPath
  const {
    isFetching,
    lastUpdated,
    didInvalidate,
  } = bookshelf[bookshelfPath] || {
    isFetching: true,
  }

  return {
    bookshelfPath,
    isFetching,
    didInvalidate,
    lastUpdated,
  }
}

export class Bookshelf extends React.Component {
  static propTypes = {
    fileContent: PropTypes.array.isRequired
  };

  componentDidMount () {
    this.props.fetchPostsIfNeeded(this.props.bookshelfPath, this.props.isFile)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.bookshelfPath !== this.props.bookshelfPath) {
  // TODO isFileが変更されない問題
      let isFile = path.extname(nextProps.bookshelfPath).length > 0
      this.props.fetchPostsIfNeeded(nextProps.bookshelfPath, isFile)
    }
  }

  logoClick () {
    this.props.selectedPath('/')
  }

  render () {
    const { isFile, bookshelfPath, isFetching, lastUpdated } = this.props

    const childDOM = () => {
      let loading =
        <h2>Loading...</h2>
  
      let bookshelfList =
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <BookshelfList bookshelfPath={bookshelfPath}/>
      </div>

      let preview =
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <Preview />
      </div>

      if (isFetching) {
        return loading
      } 
      return isFile
        ? preview
        : bookshelfList
    }

    return (
      <div className='container text-center'>
        <h2>
          Bookshelf Path :
          {' '}
          <span className={classes['counter--green']}>{bookshelfPath}</span>
        </h2>
        {childDOM()}
      </div>
    )
  }
}

// export default connect(mapStateToProps, counterActions)(Bookshelf)
export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf)

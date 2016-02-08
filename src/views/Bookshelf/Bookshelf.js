import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
// import { fetchByPath, selectedBookshelfPath } from '../../actions/bookshelfPath'
import path from 'path'
import Image from './logo.png'
import classes from './Bookshelf.scss'
import BookshelfList from './BookshelfList'
import Footer from '../Footer/Footer'
import Preview from '../Preview/Preview'

function mapStateToProps (state) {

  const { bookshelf } = state
  const bookshelfPath = bookshelf.bookshelfPath
  const {
    isFetching,
    lastUpdated,
    didInvalidate,
    files,
    fileContent,
    justUnder,
    isFile
  } = bookshelf[bookshelfPath] || {
    isFetching: true,
    justUnder: [],
    files: [],
    fileContent: [],
    isFile: false
  }

  return {
    bookshelfPath,
    isFile,
    files,
    fileContent,
    justUnder,
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
//    this.props.selectedBookshelfPath(this.props.bookshelPath)
  
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
    this.props.selectedBookshelfPath('/')
  }

  render () {
    const { bookshelfPath, justUnder, files, isFetching, lastUpdated, fileContent } = this.props

    const childDOM = () => {
      let loading =
        <h2>Loading...</h2>
  
      let empty =
        <h2>Empty.</h2>
  
      let bookshelfList =
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <BookshelfList bookshelfPath={bookshelfPath} files={files} justUnder={justUnder} />
      </div>

      let preview =
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <Preview fileContent={fileContent} />
      </div>

      if (isFetching) {         
        return loading          
      }                         
      if (fileContent)  {
        return preview          
      }
      if (!justUnder || !files) {
        return null
      }

      let isEmptyJustUnder = justUnder.length === 0
      let isEmptyFile = files.length === 0

      if (!isEmptyJustUnder || !isEmptyFile) {
        return bookshelfList
      }
      if (!isFetching) {
        return empty
      }
      return null
    }

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
        <h2>
          Bookshelf Path :
          {' '}
          <span className={classes['counter--green']}>{bookshelfPath}</span>
        </h2>
        {childDOM()}
        <Footer lastUpdated={lastUpdated}/>
      </div>
    )
  }
}

// export default connect(mapStateToProps, counterActions)(Bookshelf)
export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf)

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
// import { fetchByPath, selectedBookshelfPath } from '../../actions/bookshelfPath'
import Image from './logo.png'
import classes from './Bookshelf.scss'
import BookshelfList from './BookshelfList'
import Footer from './Footer'

function mapStateToProps (state) {
  console.dir('-----start mapStateToProps----')
  console.dir(state)

  const { bookshelf } = state
  const bookshelfPath = bookshelf.bookshelfPath
  console.dir('-----end mapStateToProps----')
  const {
    isFetching,
    lastUpdated,
    didInvalidate,
    files,
    justUnder
  } = bookshelf[bookshelfPath] || {
    isFetching: true,
    justUnder: [],
    files: []
  }

  return {
    bookshelfPath,
    files,
    justUnder,
    isFetching,
    didInvalidate,
    lastUpdated,
  }
}

export class Bookshelf extends React.Component {
  static propTypes = {
  };

  componentDidMount () {
    console.dir('----start bookshelf componentDidMount----')
    console.dir('this.props')
    console.dir(this.props)
//    this.props.selectedBookshelfPath(this.props.bookshelPath)
    this.props.fetchPostsIfNeeded(this.props.bookshelfPath)
    console.dir('----end bookshelf componentDidMount----')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.bookshelfPath !== this.props.bookshelfPath) {
      console.dir('componentWillReceiveProps')
      console.dir(this.props)
      this.props.fetchPostsIfNeeded(nextProps.bookshelfPath)
    }
  }

  logoClick () {
    this.props.selectedBookshelfPath('/')
  }

  render () {
    const { bookshelfPath, justUnder, files, isFetching, lastUpdated } = this.props


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
        {justUnder && isFetching && justUnder.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && justUnder && justUnder.length === 0 && files.length === 0 &&
          <h2>Empty.</h2>
        }
        { files && files.length > 0  &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <BookshelfList bookshelfPath={bookshelfPath} files={files} justUnder={justUnder} />
          </div>
        }
      <Footer lastUpdated={lastUpdated}/>
      </div>
    )
  }
}

// export default connect(mapStateToProps, counterActions)(Bookshelf)
export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf)

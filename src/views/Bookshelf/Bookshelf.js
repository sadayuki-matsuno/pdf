import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
import { fetchByPath, selectedBookshelfPath, fetchPostsIfNeeded } from '../../actions/bookshelfPath'
import Image from './logo.png'
import classes from './Bookshelf.scss'
import BookshelfList from './BookshelfList'

function mapStateToProps (state) {
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = fetchByPath[selectedBookshelfPath] || {
    isFetching: true,
    items: []
  }

  return {
    selectedBookshelfPath,
    posts,
    isFetching,
    lastUpdated,
    state
  }
}

export class Bookshelf extends React.Component {
  static propTypes = {
  };

  componentDidMount () {
    const { dispatch, selectedBookshelfPath } = this.props
    dispatch(fetchPostsIfNeeded(selectedBookshelfPath))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedBookshelfPath !== this.props.selectedBookshelfPath) {
      const { dispatch, selectedBookshelfPath } = nextProps
      dispatch(fetchPostsIfNeeded(selectedBookshelfPath))
    }
  }

  handleChange (nextBookshelfPath) {
    this.props.dispatch(selectedBookshelfPath(nextBookshelfPath))
  }

  handleRefreshClick (e) {
    e.preventDefault()

    const { dispatch, selectedBookshelfPath } = this.props
//    dispatch(invalidateBbookshelfPath(selectedBookshelfPath))
    dispatch(fetchPostsIfNeeded(selectedBookshelfPath))
  }

  render () {
    const { selectedBookshelfPath, posts, isFetching, lastUpdated } = this.props
    const options = ['aws', 'aws12']
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
            <img className={classes.duck}
                 src={Image}
                 alt='This is a duck, because Redux.' />
          </div>
        </div>
        <h1>Welcome to Matsuno PDF Viewer</h1>
        <h2>
          Bookshelf Path :
          {' '}
          <span className={classes['counter--green']}>{selectedBookshelfPath}</span>
        </h2>
        <span>
          <select onChange={e => this.handleChange(e.target.value)}
                  value={selectedBookshelfPath}>
            {options.map(option =>
              <option value={option} key={option}>
                {option}
              </option>)
            }
          </select>
        </span>
        <hr />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {!posts || isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!posts || !isFetching && posts && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts && posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <BookshelfList posts={posts} />
          </div>
        }
      </div>
    )
  }
}

// export default connect(mapStateToProps, counterActions)(Bookshelf)
export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf)

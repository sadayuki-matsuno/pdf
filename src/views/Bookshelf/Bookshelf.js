import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as counterActions } from '../../redux/modules/bookshelfPath'
import { selectBookshelfPath, fetchPostsIfNeeded, invalidBookshelfPath } from '../../redux/modules/bookshelfPath'
import Image from './logo.png'
import classes from './Bookshelf.scss'
import BookshelfList from './BookshelfList'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
function mapStateToProps (state) {

  const { selectedBookshelfPath, postsByBookshelfPath } = state
  console.dir('selectedBookshelfPath-----')
  console.dir(selectedBookshelfPath)
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByBookshelfPath[selectedBookshelfPath] || {
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
//    bookshelfPath: PropTypes.string.isRequired
//    doubleAsync: PropTypes.func.isRequired,
//    dig: PropTypes.func.isRequired
  };


  componentDidMount() {
    const { dispatch, selectedBookshelfPath } = this.props
    dispatch(fetchPostsIfNeeded(selectedBookshelfPath))
  }  

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBookshelfPath !== this.props.selectedBookshelfPath) {
      const { dispatch, selectedBookshelfPath } = nextProps
      dispatch(fetchPostsIfNeeded(selectedBookshelfPath))
    }
  }

  handleChange (nextBookshelfPath) {
    this.props.dispatch(selectBookshelfPath(nextBookshelfPath))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedBookshelfPath } = this.props
    dispatch(invalidateBbookshelfPath(selectedBookshelfPath))
    dispatch(fetchPostsIfNeeded(selectedBookshelfPath))
  }

  render () {
    const { selectedBookshelfPath, posts, isFetching, lastUpdated } = this.props
    const options = ['aws','aws12']
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
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <BookshelfList posts={posts} />
          </div>
        }
      </div>
    )
  }
}

// export default connect(mapStateToProps, counterActions)(Bookshelf)
export default connect(mapStateToProps)(Bookshelf)

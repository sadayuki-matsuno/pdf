import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
// import classes from './Bookshelf.scss'

const mapStateToProps = (state) => ({
  bookshelfPath: state.bookshelfPath
})

export class Bookshelf extends React.Component {
  static propTypes = {
    bookshelfPath: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <button className='btn btn-default'>
          dig
        </button>
        {' '}
        <button className='btn btn-default'>
          Double (Async)
        </button>
        <hr />
        {this.props.posts.map((post, i) =>
        <ul key={i}>
            <li key={i + 'fullpath'}>{post.fullPath}</li>
            <li key={i + 'lastModified'}>{post.lastModified.toLocaleString()}</li>
            <li key={i + 'childIndexOf'}>{post.childIndexOf}</li>
        </ul>
        )}
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf)

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as counterActions } from '../../redux/modules/bookshelfPath'
import classes from './Bookshelf.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  bookshelfPath: state.bookshelfPath
})
export class Bookshelf extends React.Component {
  static propTypes = {
    bookshelfPath: PropTypes.string.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    dig: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
  };

  render () {
    console.dir('post======')
    console.dir(this.props.posts)
    return (
      <div className='container text-center'>
        <button className='btn btn-default'
                onClick={() => this.props.dig(' -> something')}>
          dig
        </button>
        {' '}
        <button className='btn btn-default'
                onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
        <hr />
        <ul>
          {this.props.posts.map((post, i) =>
            <li key={i}>{post}</li>
          )}
        </ul>
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(Bookshelf)

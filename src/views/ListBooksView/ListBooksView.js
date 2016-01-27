import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as cdActions } from '../../redux/modules/directory'
// import DuckImage from './Duck.jpg'
// import classes from './HomeView.scss'
import classes from './ListBooksView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  path: state.path
})
export class ListBooksView extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    s3Path: PropTypes.func.isRequired,
    cd: PropTypes.func.isRequired
  };

  clickEvent (e) {
    console.dir(e.target.value.trim())
    let path = e.target.value.trim()
    this.props.cd(path)
  };

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to PDF Viewer</h1>
        <h2>
          Sample Counter:
          {' '}
          <span className={classes['counter--green']}>{this.props.path}</span>
        </h2>
        <button className='btn btn-default' value='aws'
                onClick={this.clickEvent.bind(this)}>
          aws
        </button>
        {' '}
        <button className='btn btn-default' value='aws2'
                onClick={this.clickEvent.bind(this)}>
          aws2
        </button>
        <hr />
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, cdActions)(ListBooksView)

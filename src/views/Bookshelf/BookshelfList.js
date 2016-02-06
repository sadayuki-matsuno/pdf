import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
// import classes from './Bookshelf.scss'

const mapStateToProps = (state) => ({
  dummy: state.bookshelfPath
})

export class BookshelfList extends React.Component {
  static propTypes = {
    bookshelfPath: PropTypes.string.isRequired,
    justUnder: PropTypes.array.isRequired
  };

  render () {
    console.dir('++++++++start BookshelfList+++++++++')
    console.dir(this.props)
    console.dir('++++++++end BookshelfList+++++++++')

    const { bookshelfPath, justUnder } = this.props
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
        <ul>
          {justUnder.map((path, i) =>
            <li key={i}>{path}</li>
//            <li key={i + 'lastModified'}>{path.lastModified.toLocaleString()}</li>
//            <li key={i + 'childIndexOf'}>{path.childIndexOf}</li>
          )}
        </ul>
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookshelfList)

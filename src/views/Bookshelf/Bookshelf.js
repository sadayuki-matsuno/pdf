import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Bookshelf.scss'
import BookshelfList from './BookshelfList'
import Preview from '../Preview/Preview'

const mapStateToProps = state => ({
  bookshelfPath: state.bookshelf.bookshelfPath,
  isFile: state.bookshelf.isFile
})

export class Bookshelf extends React.Component {
  static propTypes = {
    bookshelfPath: PropTypes.string.isRequired,
    isFile: PropTypes.bool.isRequired
  };

  render () {
    const { isFile, bookshelfPath } = this.props

    return (
      <div className='container text-center'>
        <h2>
          Bookshelf Path :
          {' '}
          <span className={classes['counter--green']}>{bookshelfPath}</span>
        </h2>
        {isFile ? <Preview /> : <BookshelfList bookshelfPath={bookshelfPath}/>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Bookshelf)

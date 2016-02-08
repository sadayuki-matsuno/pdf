import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Preview.scss'
import path from 'path'

function mapStateToProps (state) {
  return {dummy: state.bookshelfPath}
}

export class BookshelfList extends React.Component {
  static propTypes = {
  };

// clickPath (bookshelfPath, nextDir) {
//   const nextFullPath = path.resolve(bookshelfPath, nextDir)
// 
//   this.props.selectedBookshelfPath(nextFullPath)
// }
// 
// clickFile (bookshelfPath, nextDir) {
//   const nextFullPath = path.resolve(bookshelfPath, nextDir)
// 
//   this.props.selectedBookshelfPath(nextFullPath)
// }

  render () {

    const { bookshelfPath, fileContent } = this.props
    return (
      <div className='container text-center'>
        <hr />
        <h2>This is Preview</h2>
      </div>
    )
  }
}

export default connect(mapStateToProps)(BookshelfList)

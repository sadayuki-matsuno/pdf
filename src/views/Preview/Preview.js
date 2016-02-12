import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Preview.scss'
import path from 'path'
import View from './View'

function mapStateToProps (state) {
  return {dummy: state.bookshelfPath}
}

export class Preview extends React.Component {
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
        <View fileContent={fileContent} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Preview)

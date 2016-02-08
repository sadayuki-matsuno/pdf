import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
import classes from './Bookshelf.scss'
import path from 'path'

function mapStateToProps (state) {
  return {dummy: state.bookshelfPath}
}

export class BookshelfList extends React.Component {
  static propTypes = {
    justUnder: PropTypes.array.isRequired
  };

clickPath (bookshelfPath, nextDir) {
  const nextFullPath = path.resolve(bookshelfPath, nextDir)

  this.props.selectedBookshelfPath(nextFullPath)
}

clickFile (bookshelfPath, nextDir) {
  const nextFullPath = path.resolve(bookshelfPath, nextDir)

  this.props.selectedBookshelfPath(nextFullPath)
}

  render () {

    const { bookshelfPath, files, justUnder } = this.props
    return (
      <div className='container text-center'>
        <hr />
       {justUnder.map((path, i) =>
          <div key={i + 'div-path'}>
            <button 
              value={path}
              className={'btn btn-default btn-lg col-md-3 col-sm-2 ' + classes['path-button']} 
              onClick={ e => this.clickPath(bookshelfPath, e.target.value) }
              key={i + path}
            >
              {path}
            </button>
         </div>
       )}
       {bookshelfPath != '/' && files.map((file, i) =>
          <div key={i + 'div-file'}>
            <button 
              value={file.fullPath}
              className={'btn btn-default btn-lg col-md-5 col-sm-3 btn-success ' + classes['file-button']} 
              onClick={ e => this.clickFile(bookshelfPath, e.target.value) }
              key={i + 'file'}
            >
              {file.fullPath}
            </button>
         </div>
       )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookshelfList)

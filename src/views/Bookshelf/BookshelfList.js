import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
import classes from './Bookshelf.scss'
import path from 'path'

const mapStateToProps = state => ({
  dirs: state.bookshelf[state.bookshelf.bookshelfPath].dirs,
  files: state.bookshelf[state.bookshelf.bookshelfPath].files
})

export class BookshelfList extends React.Component {
  static propTypes = {
    bookshelfPath: PropTypes.string.isRequired,
    dirs: PropTypes.array.isRequired,
    files: PropTypes.array.isRequired,
    selectedPath: PropTypes.func.isRequired
  };

clickPath (bookshelfPath, nextDir) {
  const nextFullPath = path.resolve(bookshelfPath, nextDir)
  this.props.selectedPath(nextFullPath)
}

clickFile (bookshelfPath, nextDir) {
  const nextFullPath = path.resolve(bookshelfPath, nextDir)
  this.props.selectedPath(nextFullPath)
}

classAttr (dirs, i) {
  let defaultAttr = 'btn btn-default btn-lg col-md-3 col-sm-2 '
  return (!dirs || i >= dirs.length)
    ? defaultAttr + 'btn-success ' + classes['file-button']
    : defaultAttr + classes['file-button']
}

  render () {
    const { bookshelfPath, files, dirs } = this.props
    let eles = dirs ? dirs.concat(files) : files
    return (
      <div className='container text-center'>
       {eles.map((ele, i) =>
          <div key={i + 'div-path'}>
            <button
              value={ele.name}
              className={this.classAttr(dirs, i)}
              onClick={ e => this.clickPath(bookshelfPath, e.target.value) }
              key={i + 'el'}
            >
              {ele.name}
            </button>
         </div>
       )}
        <hr />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookshelfList)

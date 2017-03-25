import React, { PropTypes } from 'react'
import { actions as mapDispatchToProps } from '../modules/bookshelfList'
import './BookshelfList.scss'
import path from 'path'


export class BookshelfList extends React.Component {
  static propTypes = {
    bookshelfPath: PropTypes.string.isRequired,
    dirs: PropTypes.array,
    files: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    selectedPath: PropTypes.func.isRequired,
    fetchPostsIfNeeded: PropTypes.func.isRequired
  };

  componentDidMount () {
    let { fetchPostsIfNeeded, bookshelfPath } = this.props
    fetchPostsIfNeeded(bookshelfPath)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.bookshelfPath !== this.props.bookshelfPath) {
  // TODO isFileが変更されない問題
      let isFile = path.extname(nextProps.bookshelfPath).length > 0
      this.props.fetchPostsIfNeeded(nextProps.bookshelfPath, isFile)
    }
  }

  clickPath = (e) => {
    let bookshelfPath = this.props.bookshelfPath
    let nextDir = e.target.value
    const nextFullPath = path.resolve(bookshelfPath, nextDir)
    this.props.selectedPath(nextFullPath)
  }

  classAttr (dirs, i) {
    let defaultAttr = 'btn btn-default btn-lg col-md-3 col-sm-2 '
    return (!dirs || i >= dirs.length)
      ? defaultAttr + 'btn-success ' + ' file-button '
      : defaultAttr + ' file-button '
  }

  render () {
    const { files, dirs, isFetching } = this.props
    let eles = (dirs || files) ? dirs.concat(files) : []
    return (
      <div className='container text-center'>
       {!isFetching && eles.map((ele, i) =>
         <div key={i + 'div-path'}>
           <button
             value={ele.name}
             className={this.classAttr(dirs, i)}
             onClick={this.clickPath}
             key={i + 'el'}
           >
             {ele.name}
           </button>
         </div>
       )}
       {isFetching && <h2>loading ...</h2>}
        <hr />
      </div>
    )
  }
}

export default BookshelfList

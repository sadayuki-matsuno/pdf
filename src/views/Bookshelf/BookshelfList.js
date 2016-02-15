import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as mapDispatchToProps } from '../../actions/bookshelfPath'
import classes from './Bookshelf.scss'
import path from 'path'

const mapStateToProps = state => {
  const { bookshelfPath } = state.bookshelf
  const {
    dirs,
    files,
    isFetching,
    didInvalidate
  } = state.bookshelf[bookshelfPath] || {
    isFetching: true
  }

  return {
    bookshelfPath,
    dirs,
    files,
    isFetching,
    didInvalidate
  }
}

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

  clickPath (bookshelfPath, nextDir) {
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
    const { bookshelfPath, files, dirs, isFetching } = this.props
    let eles = (dirs || files) ? dirs.concat(files) : []
    return (
      <div className='container text-center'>
       {!isFetching && eles.map((ele, i) =>
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
       {isFetching && <h2>loading ...</h2>}
        <hr />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookshelfList)

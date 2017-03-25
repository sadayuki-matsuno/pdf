import React, { PropTypes } from 'react'
import './Bookshelf.scss'
import BookshelfList from '../../BookshelfList'
import Preview from '../../Preview'

export const Bookshelf = (props) => (
//  static propTypes = {
//    bookshelfPath: PropTypes.string.isRequired,
//    isFile: PropTypes.bool.isRequired
//  };
  <div className='container text-center'>
    <h2>
      Bookshelf Path :
      {' '}
      <span className='counter--green'>{props.bookshelfPath}</span>
    </h2>
    {props.isFile ? <Preview /> : <BookshelfList bookshelfPath={props.bookshelfPath}/>}
  </div>
)

export default Bookshelf

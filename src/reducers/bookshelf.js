import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { INVALIDATE_BOOKSHELF, RECEIVE_POSTS, REQUEST_POSTS }from '../constants/constants'

export default handleActions({
  SELECT_BOOKSHELF_PATH: (state, action) => (
    Object.assign({}, state, {
      bookshelfPath: action.payload.bookshelfPath,
      isPdf: action.payload.isFile
    })
  ),
  REQUEST_POSTS: (state, action) => (
    Object.assign({}, state, {
      [action.payload.bookshelfPath]: {
        isFetching: true,
        didInvalidate: false
      }
    })
  ),
  RECEIVE_POSTS: (state, action) => (
    Object.assign({}, state, {
      [action.payload.bookshelfPath]: {
        isFetching: false,
        didInvalidate: false,
        files: action.payload.files,
        justUnder: action.payload.justUnder,
        lastUpdated: action.payload.receivedAt
      }
    })
  ),
  INVALIDATE_BOOKSHELF: (state, action) => (
    Object.assign({}, state, {
      [action.payload.bookshelfPath]: {
        didInvalidate: true
      }
    })
  ),
},{ bookshelfPath: '/', isPdf: false })


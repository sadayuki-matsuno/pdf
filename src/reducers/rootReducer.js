import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
//import { getS3Obj, fetchByPath } from './modules/bookshelfPath'
import bookshelfPath from '../actions/bookshelfPath'
import { handleActions } from 'redux-actions'

function initialState () {
  return {
    isFetching: false,
    didInvalidate: false,
    items: [],
    bookshelfPath: '/'
  }
}

export default handleActions({
  GET_S3_OBJECT: (state, action) => ({
    items: action.payload.posts,
    lastUpdated: action.payload.receivedAt
  }),
  SELECT_BOOKSHELF_PATH: (state, action) => ({
    bookshelfPath: action.bookshelfPath
  }),
  REQUEST_POSTS: (state, action) => ({
    isFetching: true,
    didInvalidate: false
  }),
  RECEIVE_POSTS: (state, action) => ({
    isFetching: false,
    didInvalidate: false,
    items: action.posts,
    lastUpdated: action.receivedAt
  }),
  INVALIDATE_BOOKSHELF: (state, action) => ({
    didInvalidate: true
  })
}, initialState)

export default combineReducers({
  bookshelfPath,
  router
})


import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import bookshelfPath from './modules/bookshelfPath'
import {
  INVALIDATE_BOOKSHELF,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_BOOKSHELF
} from './modules/bookshelfPath'
// import directory from './modules/directory'

function selectedBookshelfPath (state = '/', action) {
  console.dir('selectedBookshelfPath')
//  console.dir(action)
  switch (action.type) {
    case SELECT_BOOKSHELF:
      return action.bookshelfPath
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_BOOKSHELF:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByBookshelfPath (state = { }, action) {
  console.dir('action.type postsByBookshelfPath')
  console.dir(action.type)
  switch (action.type) {
  case INVALIDATE_BOOKSHELF:
  case RECEIVE_POSTS:
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      [action.bookshelfPath]: posts(state[action.bookshelfPath], action)
    })
  default:
    return state
  }
}

export default combineReducers({
  bookshelfPath,
  postsByBookshelfPath,
  selectedBookshelfPath,
  counter,
  router
})


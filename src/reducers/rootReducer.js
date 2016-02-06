import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import bookshelf from './bookshelf'

export default combineReducers({
  bookshelf,
  router
})


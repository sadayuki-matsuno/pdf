import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import bookshelf from './bookshelf'
import auth from './auth'

export default combineReducers({
  auth,
  bookshelf,
  router
})


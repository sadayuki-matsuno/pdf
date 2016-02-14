import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import auth from './auth'
import preview from './preview'
import bookshelf from './bookshelf'

export default combineReducers({
  auth,
  bookshelf,
  preview,
  router
})


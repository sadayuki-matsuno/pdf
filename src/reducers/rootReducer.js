import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import auth from './auth'
import preview from './preview'
import bookshelf from './bookshelf'

export default combineReducers({
  auth,
  bookshelf,
  preview,
  router
})


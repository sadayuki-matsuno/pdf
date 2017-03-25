import { combineReducers } from 'redux'
import locationReducer from './location'
import auth from '../reducers/auth'
import preview from '../reducers/preview'
import bookshelf from '../reducers/bookshelf'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth,
    bookshelf,
    preview,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

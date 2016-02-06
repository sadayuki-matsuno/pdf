import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { INVALIDATE_BOOKSHELF, RECEIVE_POSTS, REQUEST_POSTS }from '../constants/constants'

//function fetchByPath (state = {}, action) {
//  console.dir('----start fetch path---')
//  console.dir('state')
//  console.dir(state)
//  console.dir('action')
//  console.dir(action)
//  console.dir('----end fetch path---')
//
//  switch (action.type) {
//    case INVALIDATE_BOOKSHELF:
//    case RECEIVE_POSTS:
//    case REQUEST_POSTS:
//      return Object.assign({}, state, {
//        [action.payload.bookshelfPath]: posts(state[action.payload.bookshelfPath], action)
//      })
//    default:
//      return state
//  }
//}


//const initialState = {
//  ['/']: {
//    isFetching: false,
//    didInvalidate: false,
//    items: [],
//  }
//}

export default handleActions({
  SELECT_BOOKSHELF_PATH: (state, action) => (
    Object.assign({}, state, {
      bookshelfPath: action.payload.bookshelfPath
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
        justUnder: action.payload.justUnder,
        pwd: action.payload.pwd,
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
},{ bookshelfPath: '/' })//, initialState)

// export default handleActions({
//   SELECT_BOOKSHELF_PATH: (state, action) => {
//   console.dir('hundlers')
//   console.dir(state)
//   console.dir(action)
//   return {
//     bookshelfPath: state.bookshelfPath
//   }},
//   REQUEST_POSTS: (state, action) => ({
//     isFetching: true,
//     didInvalidate: false
//   }),
//   RECEIVE_POSTS: (state, action) => ({
//     isFetching: false,
//     didInvalidate: false,
//     items: action.posts,
//     lastUpdated: action.receivedAt
//   }),
//   INVALIDATE_BOOKSHELF: (state, action) => ({
//     didInvalidate: true
//   })
// }, initialState)


// export default combineReducers({
//   fetchByPath
// })

import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const CHANGE_DIRECTORY = 'CHANGE_DIRECTORY'

// ------------------------------------
// Actions
// ------------------------------------
export const s3Path = createAction(CHANGE_DIRECTORY, (value = '/') => value)

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const cd = (path) => {
  return (dispatch, getState) => {
    console.dir('this is :' + getState().path + '/' + path)
  }
}

export const actions = {
  s3Path,
  cd
//  doubleAsync
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [CHANGE_DIRECTORY]: (state, { payload }) => payload
}, '/')

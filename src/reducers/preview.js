import { handleActions } from 'redux-actions'

export default handleActions({
  REQUEST_URL: (state, action) => (
    Object.assign({}, state, {
      [action.payload.bookshelfPath]: {
        isFetching: true,
        didInvalidate: false
      }
    })
  ),
  RECEIVE_URL: (state, action) => (
    Object.assign({}, state, {
      [action.payload.bookshelfPath]: {
        isFetching: false,
        didInvalidate: false,
        fileUrl: action.payload.fileUrl,
        receivedAt: action.payload.receivedAt
      }
    })
  )
}, {}
)


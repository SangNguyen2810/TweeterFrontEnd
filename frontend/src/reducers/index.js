import { combineReducers } from 'redux'
import loading from './loading'
import auth from './authReducer'
import errors from './errorReducer'
export default combineReducers({
  loading,
  auth,
  errors
})
import appReducer from './app.reducer'
import authReducer from './auth.reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { combineReducers } from 'redux'
const loadingBar = loadingBarReducer
const appReducers = combineReducers({
  authReducer,
  loadingBar,
  appReducer
})

export default appReducers

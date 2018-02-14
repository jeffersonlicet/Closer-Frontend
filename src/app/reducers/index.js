import appReducer from './app.reducer'
import authReducer from './auth.reducer'
import storyReducer from './story.reducer'

import { loadingBarReducer } from 'react-redux-loading-bar'
import { combineReducers } from 'redux'

const loadingBar = loadingBarReducer
const appReducers = combineReducers({
  authReducer,
  loadingBar,
  storyReducer,
  appReducer,
})

export default appReducers

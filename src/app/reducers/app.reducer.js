
import { SHOW_LOADING, HIDE_LOADING, TO_BUSY_STATE, TO_NORMAL_STATE } from '../constants/app.constants'

const initialState = {
  loading: false,
  isBusy: false,
  anyError: false
}

const appReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, loading: true }
    case HIDE_LOADING:
      return { ...state, loading: false }
    case TO_BUSY_STATE:
      return { ...state, isBusy: true }
    case TO_NORMAL_STATE:
      return { ...state, isBusy: false }
    default:
      return state
  }
}

export default appReducer

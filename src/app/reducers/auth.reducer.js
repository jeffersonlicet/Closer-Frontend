import { SIGNIN_SUCCESS, SHOW_SIGNIN_ERROR, HIDE_SIGNIN_ERROR } from '../constants/auth.constants'
import cookie from 'react-cookies'

let user = cookie.load('user')

const initialState = {
    loggedIn: (user ? true : false),
    user:  user,
    signinForm: { anyError:false, error:{ title: '', content:'' } }
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNIN_SUCCESS:
            return { ...state, loggedIn: true, user : action.user, signinForm: { anyError: false}}
        case SHOW_SIGNIN_ERROR:
            return { ...state, signinForm: { anyError: true, error: { title: action.error.title, content: action.error.content }}}
        case HIDE_SIGNIN_ERROR:
            return { ...state, signinForm: { ...state.signinForm, anyError: false}}
        default:
            return state
    }
}

export default authReducer
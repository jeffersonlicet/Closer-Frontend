import { 
  SIGNIN_SUCCESS, 
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
  SHOW_SIGNIN_ERROR, 
  HIDE_SIGNIN_ERROR, 
  SHOW_SIGNUP_ERROR, 
  HIDE_SIGNUP_ERROR,
  VALIDATING_USERNAME,
  VALIDATING_EMAIL,
  VALIDATING_PASSWORD,
  VALIDATING_PASSWORD_CONFIRMATION,
  HIDE_VALIDATING_USERNAME_ERROR,
  HIDE_VALIDATING_EMAIL_ERROR,
  HIDE_VALIDATING_PASSWORD_ERROR,
  HIDE_VALIDATING_PASSWORD_CONFIRMATION_ERROR } from '../constants/auth.constants'
  import { read } from '../services/storage.services'

let user = read('user')
let credentials = read('credentials')

const initialState = {
  loggedIn: !!user,
  user: !!user ? user : '',
  credentials: credentials,
  signinForm: { anyError: false, error: { title: '', content: '' } },
  signupForm: { 
    validation: { 
      username: { anyError: false, status: '', error: { title: '', content: '' }}, 
      email: { anyError: false, status: '', error: { title: '', content: '' }},
      password: { anyError: false, status: '', error: { title: '', content: '' }}, 
      password_confirmation: { anyError: false, status: '', error: { title: '', content: '' }},
    }, anyError: false, error: { title: '', content: '' } }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, user: ''}
    case SIGNIN_SUCCESS:
      return { ...state, loggedIn: true, user: action.user, credentials: action.credentials, signinForm: { ...state.signinForm,  anyError: false } }
    case SIGNUP_SUCCESS:
      return { ...state, loggedIn: true, user: action.user, credentials: action.credentials, signinForm: {  ...state.signinForm, anyError: false } }
    case SHOW_SIGNIN_ERROR:
      return { ...state, signinForm: {  ...state.signinForm, anyError: true, error: { title: action.error.title, content: action.error.content } } }
    case HIDE_SIGNIN_ERROR:
      return { ...state, signinForm: { ...state.signinForm, anyError: false } }
    case SHOW_SIGNUP_ERROR:
      return { ...state, signupForm: { ...state.signupForm, anyError: true, error: { title: action.error.title, content: action.error.content } } }
    case HIDE_SIGNUP_ERROR:
      return { ...state, signupForm: { ...state.signupForm, anyError: false } }
    case VALIDATING_USERNAME:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, username: { anyError: action.state === 'error', error:action.error,  status: action.state } }}}
    case VALIDATING_EMAIL:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, email: { anyError: action.state === 'error', error:action.error, status: action.state } }}}
    case VALIDATING_PASSWORD:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, password: { anyError: action.state === 'error', error:action.error, status: action.state } }}}
    case VALIDATING_PASSWORD_CONFIRMATION:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, password_confirmation: { anyError: action.state === 'error', error:action.error, status: action.state } }}}
    case HIDE_VALIDATING_USERNAME_ERROR:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, username: { ...state.signupForm.validation.username, anyError: false, status: ''} }}}
    case HIDE_VALIDATING_EMAIL_ERROR:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, email: { ...state.signupForm.validation.email, anyError: false, status: '' } }}}
    case HIDE_VALIDATING_PASSWORD_ERROR:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, password: { ...state.signupForm.validation.username, anyError: false, status: ''} }}}
    case HIDE_VALIDATING_PASSWORD_CONFIRMATION_ERROR:
      return { ...state, signupForm: { ...state.signupForm,  validation: { ...state.signupForm.validation, password_confirmation: { ...state.signupForm.validation.email, anyError: false, status: '' } }}}
    default:
      return state
  }
}

export default authReducer

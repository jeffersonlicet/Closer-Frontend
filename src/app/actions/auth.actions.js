import { 
  SHOW_SIGNIN_ERROR, 
  HIDE_SIGNIN_ERROR, 
  SHOW_SIGNUP_ERROR, 
  HIDE_SIGNUP_ERROR,
  SIGNIN_SUCCESS, 
  SIGNUP_SUCCESS,
  VALIDATING_USERNAME,
  VALIDATING_EMAIL,
  VALIDATING_PASSWORD,
  VALIDATING_PASSWORD_CONFIRMATION,
  HIDE_VALIDATING_USERNAME_ERROR,
  HIDE_VALIDATING_EMAIL_ERROR,
  HIDE_VALIDATING_PASSWORD_ERROR,
  HIDE_VALIDATING_PASSWORD_CONFIRMATION_ERROR } from '../constants/auth.constants'

import { PASSWORD_LENGHT } from '../constants/app.constants'

import { SigninService, SignupService, UsernameVerification, EmailVerification } from '../services/auth.services'
import { toggleBusy } from '../actions/app.actions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { history } from '../helpers/history'

export const verifyUsername = (username) => {
  return dispatch => {
    dispatch(toggleBusy(true))
    dispatch(validatingState('validating', { title: '', content: ''}))

    UsernameVerification(username)
      .then(
        response => {
          dispatch(toggleBusy(false))
          if(response.status) {
            dispatch(validatingState('success', { title: '', content: ''}))    
          } 
            
          else
            dispatch(validatingState('error', { title: 'Oops!', content: response.report}))    
        },

        error => {
          dispatch(toggleBusy(false))
          dispatch(validatingState('', { title: 'Oops!', content: 'Error validating data'}))
        }
      )
  }

  function validatingState(status, error) { return { type: VALIDATING_USERNAME, state: status, error: error } }
}

export const verifyEmail = (email) => {
  return dispatch => {
    dispatch(toggleBusy(true))
    dispatch(validatingState('validating', { title: '', content: ''}))

    EmailVerification(email)
    .then(
      response => {
        dispatch(toggleBusy(false))
        if(response.status) {
          dispatch(validatingState('success', { title: '', content: ''}))    
        } 
          
        else
          dispatch(validatingState('error', { title: 'Oops!', content: response.report }))    
        
      },

      error => {
        dispatch(toggleBusy(false))
        dispatch(validatingState('', { title: 'Oops!', content: 'Error validating data'}))
      }
    )
  }

  function validatingState(status, _error) { return { type: VALIDATING_EMAIL, state: status, error: _error } }
}

export const verifyPassword = (password) => {
  return dispatch => {
    dispatch(toggleBusy(true))
    dispatch(validatingState('validating', { title: '', content: ''}))

    if(password.length < PASSWORD_LENGHT)
      dispatch(validatingState('error', { title: 'Oops!', content: 'Password length must be > '+ PASSWORD_LENGHT}))    
    else 
      dispatch(validatingState('success', { title: '', content: ''}))    
  }

  function validatingState(status, error) { return { type: VALIDATING_PASSWORD, state: status, error: error } }

}

export const verifyPasswordConfirmation = (password1, password) => {

  return dispatch => {
    
    dispatch(verifyPassword(password1))
    dispatch(toggleBusy(true))
    dispatch(validatingState('validating', { title: '', content: ''}))

    if(password.length < PASSWORD_LENGHT)
      dispatch(validatingState('error', { title: 'Oops!', content: 'Password confirmation length must be > '+ PASSWORD_LENGHT}))    
    else if(password !== password1 && password1)
      dispatch(validatingState('error', { title: 'Oops!', content: 'Passwords does not match'}))    
    else 
      dispatch(validatingState('success', { title: '', content: ''}))    
  }

  function validatingState(status, error) { return { type: VALIDATING_PASSWORD_CONFIRMATION, state: status, error: error } }

}

export const signin = (identity, password) => {
  return dispatch => {
    dispatch(toggleBusy(true))
    dispatch(showLoading())
    

    SigninService(identity, password)
        .then(
            response => {
              dispatch(hideLoading())
              dispatch(toggleBusy(false))
              dispatch(success(response.user, response.credentials))
              history.push("/")
            },
            error => {
              dispatch(hideLoading())
              dispatch(toggleBusy(false))
              dispatch(showSigninFormError('Oops!', error))
            })
  }

  function success(user, credentials) { return { type: SIGNIN_SUCCESS, user: user, credentials: credentials} }
}

export const signup = (username, email, password) => {
  return dispatch => {
    dispatch(toggleBusy(true))
    dispatch(showLoading())

    SignupService(username, email, password)
    .then(
      response => {
        dispatch(hideLoading())
        dispatch(toggleBusy(false))
        dispatch(success(response.user, response.credentials))
        history.push("/")
      },

      error => {
        dispatch(hideLoading())
        dispatch(toggleBusy(false))
        dispatch(showSignupFormError('Oops!', error))
      }      
    )
  }
  
  function success(user, credentials) { return { type: SIGNUP_SUCCESS, user: user, credentials: credentials}}
}

export const showSigninFormError = (title, message) => { return { type: SHOW_SIGNIN_ERROR, error: { title: title, content: message } }}
export const hideSigninFormError = () => { return { type: HIDE_SIGNIN_ERROR } }
export const showSignupFormError = (title, message) => { return { type: SHOW_SIGNUP_ERROR, error: { title: title, content: message } }}
export const hideSignupFormError = () => { return { type: HIDE_SIGNUP_ERROR } }
export const hideValidatingUsernameError = () => { return { type: HIDE_VALIDATING_USERNAME_ERROR } }
export const hideValidatingEmailError = () => { return { type: HIDE_VALIDATING_EMAIL_ERROR } }
export const hideValidatingPasswordError = () => { return { type: HIDE_VALIDATING_PASSWORD_ERROR } }
export const hideValidatingPasswordConfirmationError = () => { return { type: HIDE_VALIDATING_PASSWORD_CONFIRMATION_ERROR } }

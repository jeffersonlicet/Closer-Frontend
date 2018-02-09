import { SHOW_SIGNIN_ERROR, HIDE_SIGNIN_ERROR, SIGNIN_SUCCESS } from '../constants/auth.constants'
import { SigninService } from '../services/auth.services'
import { toggleBusy, toggleLoading } from '../actions/app.actions'
import { message } from 'antd'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const signin = (identity, password) => {
    return dispatch => {
        dispatch(toggleBusy(true))
        dispatch(showLoading())

        SigninService(identity, password)
        .then( 
            user => {
                dispatch(hideLoading())
                dispatch(toggleBusy(false))
                dispatch(success(user))
            },
            errorMessage => {
                dispatch(hideLoading())
                dispatch(toggleBusy(false))
                dispatch(showFormError('Oops!', errorMessage))
            })
    }
    
    function success(_user) { return {type: SIGNIN_SUCCESS, user: _user} }
}

export const showFormError = (title, message) => {
    return { type: SHOW_SIGNIN_ERROR, error: { title: title, content: message}}
}

export const hideFormError = () => {
    return { type: HIDE_SIGNIN_ERROR }
}
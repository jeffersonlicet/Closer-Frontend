import React from 'react'
import cookie from 'react-cookies'
import { Route, Redirect } from 'react-router-dom';
import { SIGNIN_ROUTE } from '../constants/app.constants'

const loggedIn = cookie.load('loggedIn')

const AuthenticatedRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={ props => (
        loggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: SIGNIN_ROUTE, state: { from: props.location } }} />
    )} />
)

export default AuthenticatedRoute
import React from 'react'
import cookie from 'react-cookies'
import { Route, Redirect } from 'react-router-dom'

const loggedIn = cookie.load('loggedIn')

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
        !loggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export default GuestRoute

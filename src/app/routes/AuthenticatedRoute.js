import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { SIGNIN_ROUTE } from '../constants/app.constants'

import { read } from '../services/storage.services'

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    read('loggedIn')
            ? <Component {...props} />
            : <Redirect to={{ pathname: SIGNIN_ROUTE, state: { from: props.location } }} />
    )} />
)

export default AuthenticatedRoute

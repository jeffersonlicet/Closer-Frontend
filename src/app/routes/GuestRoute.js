import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { read } from '../services/storage.services'

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
          !read('loggedIn')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export default GuestRoute

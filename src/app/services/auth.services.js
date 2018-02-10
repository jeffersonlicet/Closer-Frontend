import { SERVICE_URL } from '../constants/app.constants'
import cookie from 'react-cookies'
import withQuery from 'with-query'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const UsernameVerification = (username) => {
  const requestOptions = {
    method: 'GET',
    headers: defaultHeaders
  }

  return fetch(withQuery(SERVICE_URL + '/validate/username', { username: username }), requestOptions)
    .then(response => {
      if(!response.ok)
        Promise.reject(response.statusText)
      
        return response.json()
    })
    .then( response => {
      return response
    })
}

export const EmailVerification = (email) => {
  const requestOptions = {
    method: 'GET',
    headers: defaultHeaders
  }

  return fetch(withQuery(SERVICE_URL + '/validate/email', { email: email }), requestOptions)
    .then(response => {
      if(!response.ok)
        Promise.reject(response.statusText)
      
        return response.json()
    })
    .then( response => {
      return response
    })
}

export const SigninService = (identity, password) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      identity: identity,
      password: 'password'
    }),
    headers: defaultHeaders
  }

  return fetch(SERVICE_URL + '/signin', requestOptions)
        .then((response) => {
          if (!response.ok) { Promise.reject(response.statusText) }
          return response.json()
        })
        .then((response) => {
          if (response.status) {
            cookie.save('user', response.user)
            cookie.save('loggedIn', true)
            return response.user
          }

          return Promise.reject(response.report)
        })
}

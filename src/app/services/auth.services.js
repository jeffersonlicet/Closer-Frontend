import { SERVICE_URL } from '../constants/app.constants'
import { save, remove } from '../services/storage.services'
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
      password: password
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
            save('user', response.user)
            save('credentials', response.credentials)
            save('loggedIn', true)
            return response
          }

          return Promise.reject(response.report)
        })
}

export const SignupService = (username, email, password) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    }),
    headers: defaultHeaders
  }

  return fetch(SERVICE_URL + '/signup', requestOptions)
        .then((response) => {
          if (!response.ok) { Promise.reject(response.statusText) }
          return response.json()
        })
        .then((response) => {
          if (response.status) {
            save('user', response.user)
            save('credentials', response.credentials)
            save('loggedIn', true)
            return response
          }

          return Promise.reject(response.report)
        })
}

export const Logout = () => {
  remove('user')
  remove('credentials')
  remove('loggedIn')
}

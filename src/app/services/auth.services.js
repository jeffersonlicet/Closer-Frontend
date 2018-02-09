import { SERVICE_URL } from '../constants/app.constants'
import cookie from 'react-cookies'

export const SigninService = (identity, password) => {
    let formData = new FormData()
    
    formData.append('identity', identity)
    formData.append('password', password)

    const requestOptions = {
        method: 'POST',
        body: formData
    }

    return fetch(SERVICE_URL + '/signin', requestOptions)
        .then( (response) => {
            if(!response.ok)
                Promise.reject(response.statusText)
            
            return response.json()
        })
        .then( (response) => {
            
            if(response.status) {
                cookie.save('user', response.user)
                cookie.save('loggedIn', true)
                return response.user
            }
            
            return Promise.reject(response.report);
        })
}
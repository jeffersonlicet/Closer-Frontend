import cookie from 'react-cookies'
import { COOKIE_PREFIX } from '../constants/app.constants'

export const read = (property) => {
    return cookie.load(COOKIE_PREFIX+property)
}

export const save = (property, value) => {
    return cookie.save(COOKIE_PREFIX+property, value)
}

export const remove = (property) => {
    return cookie.remove(COOKIE_PREFIX+property)
}
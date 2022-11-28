import { getCookie } from './utils'

export const deserializeQuery = (query, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split('&')
  const array = pairs.map(elem => elem.split('='))
  return Object.fromEntries(array)
}

export const serializeQuery = queryParams =>
  Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
    if (typeof value === 'undefined') {
      return acc
    }
    const postfix = index === array.length - 1 ? '' : '&'
    return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`
  }, '?')

export const loginRequest = async form => {
  return await fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}
export const registerRequest = async form => {
  return await fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}

export const getUserRequest = async () =>
  await fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })

export const logoutRequest = async () => {
  return await fetch('https://norma.nomoreparties.space/api/auth/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}
export const refreshRequest = async () => {
  return await fetch('https://norma.nomoreparties.space/api/auth/token', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}
export const updateUserRequest = async form => {
  return await fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}
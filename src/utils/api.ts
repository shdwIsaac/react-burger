import { getCookie, setCookie } from './utils'
import { BASE_URL } from './constatnts'

export const tokenApi: string = BASE_URL + 'auth/token'

export const loginApi: string = BASE_URL + 'auth/login'

export const registerApi: string = BASE_URL + 'auth/register'

export const logoutApi: string = BASE_URL + 'auth/logout'

export const userApi: string = BASE_URL + 'auth/user'

export const forgotPasswordApi: string = BASE_URL + 'password-reset'

export const resetPasswordApi: string = BASE_URL + 'password-reset/reset'

export const optionsPostResetPasswordRequest = (form: any): RequestInit => {
  return {
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
  }
}

export const optionsPostForgotPasswordRequest = (form: any): RequestInit => {
  return {
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
  }
}

export const optionsPatchUserRequest = (form: any): RequestInit => {
  return {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken') ?? ''}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  }
}

export const optionsPostLogoutRequest = (): RequestInit => {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  }
}

export const optionsGetUserRequest = (): RequestInit => {
  return {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken') ?? ''}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
}

export const optionsPostRegisterRequest = (form: any): RequestInit => {
  return {
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
  }
}

export const optionsPostLogin = (form: any): RequestInit => {
  return {
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
  }
}

export const checkResponse = async <T>(res: Response): Promise<T> => {
  return res.ok ? await res.json() : await res.json().then(async (err) => await Promise.reject(err))
}

interface IToken {
  success: boolean
  user: any
  accessToken: string
  refreshToken: string
}

export const refreshToken = async (): Promise<IToken> => {
  return await request(tokenApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken() // обновляем токен
      if (!refreshData.success) {
        await Promise.reject(refreshData)
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', refreshData.accessToken, null)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options) // повторяем запрос
      return await checkResponse(res)
    } else {
      return await Promise.reject(err)
    }
  }
}
export async function request <T> (url: string, options?: RequestInit): Promise<T> {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return await fetch(url, options).then(async res => await checkResponse<T>(res))
}

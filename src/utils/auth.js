import React, { useContext, useState, createContext, useEffect } from 'react'
import { deleteCookie, getCookie, setCookie } from './utils'

import {
  fetchWithRefresh,
  loginApi,
  logoutApi,
  optionsGetUserRequest,
  optionsPatchUserRequest,
  optionsPostForgotPasswordRequest,
  optionsPostLogin,
  optionsPostLogoutRequest,
  optionsPostRegisterRequest,
  registerApi,
  userApi,
  forgotPasswordApi, resetPasswordApi, optionsPostResetPasswordRequest, request
} from './api'

const AuthContext = createContext(undefined)

// eslint-disable-next-line react/prop-types
export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth () {
  return useContext(AuthContext)
}

export function useProvideAuth () {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = getCookie('accessToken')
    if (token && JSON.parse(atob(token.split('.')[1])).exp > Date.now() * 1000) {
      setIsAuth(true)
    }
  }, [])

  const getUser = async () => {
    return await request(userApi, optionsGetUserRequest())
      .then(data => {
        if (data.success) {
          setUser(data.user)
        }
        return data.success
      })
  }
  const register = async form => {
    return await request(registerApi, optionsPostRegisterRequest(form))
      .then(data => {
        if (data.success) {
          setUser(data.user)
          setCookie('accessToken', data.accessToken.split('Bearer ')[1])
        }
        return data.success
      })
  }
  const signIn = async form => {
    return await request(loginApi, optionsPostLogin(form))
      .then(data => {
        if (data.success) {
          setUser(data.user)
          setCookie('accessToken', data.accessToken.split('Bearer ')[1])
          setCookie('refreshToken', data.refreshToken)
          localStorage.setItem('refreshToken', data.refreshToken)
        }
        return data.success
      })
  }
  const signOut = async form => {
    await request(logoutApi, optionsPostLogoutRequest(form))
    setUser(null)
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    localStorage.removeItem('refreshToken')
  }
  const updateUser = async form => {
    await fetchWithRefresh(userApi, optionsPatchUserRequest(form))
      .then(data => {
        if (data.success) {
          setUser(data.user)
        }
        return data.success
      })
  }
  const forgotPassword = async form => {
    return await request(forgotPasswordApi, optionsPostForgotPasswordRequest(form))
      .then(data => {
        return data.success
      })
  }
  const resetPassword = async form => {
    return await request(resetPasswordApi, optionsPostResetPasswordRequest(form))
      .then(data => {
        return data.success
      })
  }

  return {
    user,
    setIsAuth,
    isAuth,
    getUser,
    signIn,
    signOut,
    register,
    updateUser,
    forgotPassword,
    resetPassword
  }
}

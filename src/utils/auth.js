import React, { useContext, useState, createContext } from 'react'
import { deleteCookie, setCookie } from './utils'

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
  forgotPasswordApi, resetPasswordApi, optionsPostResetPasswordRequest
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

  const getUser = async () => {
    return await fetch(userApi, optionsGetUserRequest())
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user)
        }
        return data.success
      })
  }

  const register = async form => {
    return await fetch(registerApi, optionsPostRegisterRequest(form))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user)
          setCookie('accessToken', data.accessToken.split('Bearer ')[1])
        }
        return data.success
      })
  }

  const signIn = async form => {
    return await fetch(loginApi, optionsPostLogin(form))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user)
          setCookie('accessToken', data.accessToken.split('Bearer ')[1])
        }
        return data.success
      })
  }

  const signOut = async form => {
    await fetch(logoutApi, optionsPostLogoutRequest(form))
    setUser(null)
    deleteCookie()
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
    return await fetch(forgotPasswordApi, optionsPostForgotPasswordRequest(form))
      .then(res => res.json())
      .then(data => {
        return data.success
      })
  }

  const resetPassword = async form => {
    return await fetch(resetPasswordApi, optionsPostResetPasswordRequest(form))
      .then(res => res.json())
      .then(data => {
        return data.success
      })
  }

  return {
    user,
    getUser,
    signIn,
    signOut,
    register,
    updateUser,
    forgotPassword,
    resetPassword
  }
}

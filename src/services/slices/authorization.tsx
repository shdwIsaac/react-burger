import { Action, createSlice, ThunkDispatch } from '@reduxjs/toolkit'
import {
  fetchWithRefresh, forgotPasswordApi,
  loginApi, logoutApi,
  optionsGetUserRequest, optionsPatchUserRequest, optionsPostForgotPasswordRequest,
  optionsPostLogin, optionsPostLogoutRequest, optionsPostRegisterRequest, optionsPostResetPasswordRequest,
  registerApi,
  request, resetPasswordApi,
  userApi
} from '../../utils/api'
import { deleteCookie, getCookie, setCookie } from '../../utils/utils'
import { RootState } from './index'
import { IUser } from '../../Abstraction/IUser'

const initialState = {
  isAuthChecked: false,

  loading: true,

  user: null,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  updateUserError: null,
  updateUserRequest: false,

  getUserError: null,
  getUserRequest: false,

  forgotPasswordRequest: false,
  forgotPasswordError: null,

  logoutUserError: null
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isAuthChecked = false
      state.loginUserRequest = true
      state.user = null
    },
    loginSuccess: (state) => {
      state.isAuthChecked = true
      state.loginUserRequest = false
    },
    loginError: (state, { payload }) => {
      state.isAuthChecked = false
      state.loginUserRequest = false
      state.loginUserError = payload
    },
    updateUserRequest: (state) => {
      state.updateUserRequest = true
    },
    updateUserSuccess: (state, { payload }) => {
      state.updateUserRequest = false
      state.user = payload
    },
    getUserRequest: (state) => {
      state.getUserRequest = true
    },
    getUserSuccess: (state, { payload }) => {
      state.getUserRequest = false
      state.user = payload
    },
    getUserError: (state, { payload }) => {
      state.getUserRequest = false
      state.getUserError = payload
    },
    updateUserError: (state, { payload }) => {
      state.loginUserRequest = false
      state.user = null
      state.updateUserError = payload
    },
    logoutSuccess: (state) => {
      state.isAuthChecked = false
      state.user = null
    },
    logoutError: (state, { payload }) => {
      state.logoutUserError = payload
    },
    forgotRequest: (state) => {
      state.forgotPasswordRequest = true
    },
    forgotSuccess: (state) => {
      state.forgotPasswordRequest = false
    },
    forgotError: (state, { payload }) => {
      state.forgotPasswordRequest = false
      state.forgotPasswordError = payload
    },
    isLoad: (state) => {
      state.loading = false
    }
  }
})

export const {
  forgotRequest,
  getUserSuccess,
  getUserRequest,
  logoutSuccess,
  loginRequest,
  loginSuccess,
  updateUserSuccess,
  updateUserRequest,
  forgotSuccess,
  updateUserError,
  forgotError,
  logoutError,
  loginError,
  getUserError,
  isLoad
} = authorizationSlice.actions

export const authorizationSelector = (state: RootState): RootState['authorization'] => state.authorization

export function getUser () {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(getUserRequest())
    return await fetchWithRefresh(userApi, optionsGetUserRequest())
      .then(data => {
        if (data.success) {
          // @ts-expect-error
          dispatch(getUserSuccess(data.user))
        }
        return data.success
      }).catch(error => dispatch(getUserError(error)))
  }
}

export function signIn (form: any) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(loginRequest())
    return await request<IRegister>(loginApi, optionsPostLogin(form))
      .then(data => {
        if (data.success) {
          setCookie('accessToken', data.accessToken.split('Bearer ')[1], null)
          setCookie('refreshToken', data.refreshToken, null)
          localStorage.setItem('refreshToken', data.refreshToken)
          dispatch(loginSuccess())
        }
        return data.success
      }).catch(error => dispatch(loginError(error)))
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IRegister {
  success: boolean
  user: IUser
  accessToken: string
  refreshToken: string
}

export function register (form: any) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(loginRequest())
    return await request<IRegister>(registerApi, optionsPostRegisterRequest(form))
      .then(data => {
        if (data.success) {
          setCookie('accessToken', data.accessToken.split('Bearer ')[1], null)
          setCookie('refreshToken', data.refreshToken, null)
          localStorage.setItem('refreshToken', data.refreshToken)
          dispatch(loginSuccess())
        }
        return data.success
      }).catch(error => dispatch(loginError(error)))
  }
}

interface ISignOut {
  success: boolean
  message: string
}

export function signOut () {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    await request<ISignOut>(logoutApi, optionsPostLogoutRequest())
      .then(data => {
        if (data.success) {
          deleteCookie('accessToken')
          deleteCookie('refreshToken')
          localStorage.removeItem('refreshToken')
          dispatch(logoutSuccess())
        }
        return data.success
      }).catch(error => dispatch(logoutError(error)))
  }
}

export function updateUser (form: any) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(updateUserRequest())
    await fetchWithRefresh(userApi, optionsPatchUserRequest(form))
      .then(data => {
        if (data.success) {
          // @ts-expect-error
          dispatch(updateUserSuccess(data.user))
        }
        return data.success
      }).catch(error => dispatch(updateUserError(error)))
  }
}

interface IForgotPassword {
  success: boolean
  message: string
}

export function forgotPassword (form: any): boolean | unknown {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    dispatch(forgotRequest())
    return await request<IForgotPassword>(forgotPasswordApi, optionsPostForgotPasswordRequest(form))
      .then(data => {
        localStorage.setItem('reset', 'true')
        return data.success
      }).catch(error => dispatch(forgotError(error)))
  }
}

export function resetPassword (form: any) {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    return await request(resetPasswordApi, optionsPostResetPasswordRequest(form))
      .then(data => {
        dispatch(forgotSuccess())
        localStorage.removeItem('reset')
        // @ts-expect-error
        return data.success
      }).catch(error => dispatch(forgotError(error)))
  }
}

export function checkAuth (): any {
  return async function (dispatch: ThunkDispatch<RootState, void, Action>) {
    const token = getCookie('accessToken')
    if (token != null && JSON.parse(atob(token.split('.')[1])).exp * 1000 > Date.now()) {
      dispatch(loginSuccess())
    } else {
      dispatch(logoutSuccess())
    }
  }
}

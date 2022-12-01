import { Navigate, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authorizationSelector, getUser } from '../services/slices/authorization'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children, onlyUnAuth = false }) => {
  const { user, isAuthChecked, forgotPasswordRequest } = useSelector(authorizationSelector)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    isAuthChecked &&
    dispatch(getUser())
  }, [])

  if (onlyUnAuth && user) {
    const fromPage = location.state?.from?.pathname || '/'
    return <Navigate to={fromPage}/>
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace={true} state={{ from: location.pathname }}/>
  }
  if (onlyUnAuth && !forgotPasswordRequest) {
    return <Navigate to='/forgot-password' replace={true}/>
  }

  return children
}

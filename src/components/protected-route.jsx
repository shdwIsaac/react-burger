import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { authorizationSelector } from '../services/slices/authorization'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children, onlyUnAuth = false }) => {
  const { user } = useSelector(authorizationSelector)
  const location = useLocation()

  if (onlyUnAuth && user) {
    const fromPage = location.state?.from?.pathname || '/'
    return <Navigate to={fromPage}/>
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace={true} state={{ from: location.pathname }}/>
  }
  return children
}

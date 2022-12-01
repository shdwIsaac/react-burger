import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../utils/auth'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children, onlyUnAuth = false }) => {
  const auth = useAuth()
  const location = useLocation()

  console.log(auth.user)
  if (onlyUnAuth && auth.user) {
    return <Navigate to={location.pathname}/>
  }
  if (!onlyUnAuth && !auth.user) {
    console.log(auth.user)
    return <Navigate to='/login' replace={true} state={{ from: location.pathname }}/>
  }
  return children
}

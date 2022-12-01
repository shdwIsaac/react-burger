import { Navigate, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useAuth } from '../utils/auth'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children, onlyUnAuth = false }) => {
  const auth = useAuth()
  const location = useLocation()

  useEffect(() => {
    async function checkAuth () {
      await auth.checkAuth()
    }
    checkAuth()
  }, [])

  if (onlyUnAuth && auth.user) {
    return <Navigate to={location.pathname} replace={true} state={{ from: location.pathname }}/>
  }

  if (!onlyUnAuth && !auth.user) {
    return <Navigate to='/login' replace={true} state={{ from: location.pathname }}/>
  }
  return children
}

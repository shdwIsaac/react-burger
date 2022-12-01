import { Navigate, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useAuth } from '../utils/auth'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children, onlyUnAuth }) => {
  const auth = useAuth()
  const location = useLocation()

  useEffect(() => {
    async function checkAuth () {
      await auth.checkAuth()
    }
    checkAuth()
  }, [])

  // if (onlyUnAuth && auth.user) {

  // }

  if (!onlyUnAuth && auth.user) {
    return <Navigate to='/login' state={{ from: location }}/>
  }
  return children
}

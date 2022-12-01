import { Navigate, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useAuth } from '../utils/auth'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ authChecked, children }) => {
  const auth = useAuth()
  const location = useLocation()

  useEffect(() => {
    async function checkAuth () {
      await auth.checkAuth()
    }
    checkAuth()
  }, [])

  if (!authChecked) {
    return null
  }

  if (auth.user) {
    return <Navigate to='/login' state={{ from: location }}/>
  }
  return children
}

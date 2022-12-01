import { Navigate, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { useDispatch } from 'react-redux'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ authChecked, children }) => {
  const auth = useAuth()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(await auth.checkAuth())
  }, [])

  if (!authChecked) {
    return null
  }

  if (!auth.user) {
    return <Navigate to={{ pathname: '/login' }} state={{ from: location }} replace/>
  }
  return children
}

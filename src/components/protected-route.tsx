import { Navigate, useLocation } from 'react-router-dom'
import React, { FC } from 'react'
import { authorizationSelector } from '../services/slices/authorization'
import { useAppSelector } from '../services/slices'

interface ProtectedRouteTypes {
  children: any
  onlyUnAuth?: boolean
}
export const ProtectedRoute: FC<ProtectedRouteTypes> = ({ children, onlyUnAuth = false }) => {
  const { user, loading } = useAppSelector(authorizationSelector)
  const location = useLocation()

  if (!loading) {
    if (onlyUnAuth && user != null) {
      const fromPage: string = location.state?.from ?? '/'
      return <Navigate to={fromPage} />
    }
    if (!onlyUnAuth && user == null) {
      return <Navigate to='/login' replace={true} state={{ from: location.pathname }}/>
    }

    return children
  }
}

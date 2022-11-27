import { Navigate } from 'react-router-dom'
import React from 'react'

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

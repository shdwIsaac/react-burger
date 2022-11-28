import { Navigate } from 'react-router-dom'
import React from 'react'

// eslint-disable-next-line react/prop-types
export const AuthorizedRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/not-found" replace />
  }
  return children
}

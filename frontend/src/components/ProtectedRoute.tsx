import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useUser()
  const location = useLocation()

  if (!isLoaded) {
    return <div className="flex items-center justify-center p-8">Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

import React from 'react'

import AppRoutes from './app-routes'
import AuthRoutes from './auth-routes'

import { useAuth } from '../contexts'

export default function Routes() {
  const { signed } = useAuth()

  return signed ? <AppRoutes /> : <AuthRoutes />
}

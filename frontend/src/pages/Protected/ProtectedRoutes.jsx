import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import decode from 'jwt-decode'
import Cookies from 'js-cookie'

const checkAuth = () => {
  const cookie = Cookies.get("token")

  if (cookie) {
    try {
      const decodedToken = decode(cookie)
      if (decodedToken.id) {
        return true;
      }
      else {
        return false;
      }
    }
    catch (e) {
      return false;
    }
  }
}

const ProtectedRoutes = () => {
  let checker = checkAuth();
  useEffect(() => {
    checker = checkAuth();
  }, [])

  return (
    (checker) ? <Outlet /> : <Navigate to="/landing" />
  )
}

export default ProtectedRoutes

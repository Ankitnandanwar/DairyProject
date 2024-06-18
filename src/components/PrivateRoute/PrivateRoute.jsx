import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {
  const userDate = JSON.parse(localStorage.getItem('userData'))
  return userDate ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoute
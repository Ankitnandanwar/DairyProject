import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoute = () => {
  const userDate = JSON.parse(localStorage.getItem('userData'))
  return userDate ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoute
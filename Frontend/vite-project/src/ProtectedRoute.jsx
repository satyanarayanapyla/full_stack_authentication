import Cookies from 'js-cookie'
import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
function ProtectedRoute() {
    const isAuth=Cookies.get("email")
  return isAuth ? <Outlet/>:<Navigate to="/"/>
}

export default ProtectedRoute
import React from 'react'
import {Routes,Route} from "react-router-dom"
import Register from './components/register'
import Login from './components/login'
import User from './components/User'
const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/user" element={<User/>} />
  </Routes>
  )
}

export default AllRoutes
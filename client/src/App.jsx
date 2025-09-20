import { useState } from 'react'
import './App.css'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import UserDashboard from './pages/Dashboard/UserDashboard'
import AdminDashboard from './pages/Admin/AdminDashBoard'
import UpdateSweet from './pages/Admin/UpdateSweet'
import CreateSweet from './pages/Admin/CreateSweet'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/userdashboard' element={<UserDashboard />}/>
      <Route path='/admindashboard' element={<AdminDashboard />}/>
      <Route path='/createsweet' element={<CreateSweet />}/>
      <Route path='/updatesweet' element={<UpdateSweet />}/>
    </Routes>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import UserDashboard from './pages/Dashboard/UserDashboard'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/userdashboard' element={<UserDashboard />}/>
    </Routes>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Register from './pages/Auth/Register'
import UserDashboard from './pages/Dashboard/UserDashboard'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/' element={<UserDashboard />}/>
    </Routes>
  )
}

export default App

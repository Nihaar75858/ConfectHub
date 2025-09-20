import { useState } from 'react'
import './App.css'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default App

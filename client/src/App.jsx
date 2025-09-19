import { useState } from 'react'
import './App.css'
import Register from './pages/Auth/Register'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Register />}/>
    </Routes>
  )
}

export default App

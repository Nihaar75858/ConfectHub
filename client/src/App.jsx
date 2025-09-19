import { useState } from 'react'
import './App.css'
import Register from './pages/Auth/Register'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Sweet Shop Management</h1>
      <Register />
    </>
  )
}

export default App

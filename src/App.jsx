import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Landing/Main'
import ErrorPage from './pages/Error/ErrorPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  )
}

export default App

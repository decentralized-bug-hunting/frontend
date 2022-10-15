import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Landing/Main'
import ErrorPage from './pages/Error/ErrorPage'
import Companies from './pages/Companies/Companies'
import Issue from './pages/Issue/Issue'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/companies" element={<Companies/>}/>
        <Route path="/issue" element={<Issue/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  )
}

export default App

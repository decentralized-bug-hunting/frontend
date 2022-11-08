import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Landing/Main'
import ErrorPage from './pages/Error/ErrorPage'
import Companies from './pages/Companies/Companies'
import Issue from './pages/Issue/Issue'
import AllIssues from './pages/AllIssues/AllIssues'
import Getstarted from './pages/login/getstarted'
import PostSolution from './pages/PostSolution/Index'
import Solution from './pages/Solutions/Solutions'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/companies" element={<Companies/>}/>
        <Route path="/issue" element={<Issue/>}/>
        <Route path="/getstarted" element={<Getstarted/>}/>
        <Route path="/all-issues" element={<AllIssues/>}/>
        <Route path="/post-solution" element={<PostSolution/>}/>        
        <Route path="/solutions" element={<Solution/>}/>        
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  )
}

export default App

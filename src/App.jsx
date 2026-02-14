import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainHome from './pages/MainHome'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App;

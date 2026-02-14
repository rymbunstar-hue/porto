import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainHome from './pages/MainHome'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import useStore from './store/useStore'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const fetchData = useStore((state) => state.fetchData);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App;

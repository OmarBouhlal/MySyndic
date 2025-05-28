import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import UserFactures from "./pages/UserFactures.jsx";
import AdminFactures from "./pages/AdminFactures.jsx";
import Residents from "./pages/Residents.jsx";
import Profile from './pages/profile.jsx';

// ProtectedRoute checks if user is admin (role === true)
function ProtectedRoute({ children }) {
  const role = localStorage.getItem('role');
  if (role === "admin" || role === "true" || role === true) {
    return children;
  }
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path="/UserFactures" element={<UserFactures />} />
        <Route path="/AdminFactures" element={
          <ProtectedRoute>
            <AdminFactures />
          </ProtectedRoute>
        }/>
        <Route path="/Residents" element={
          <ProtectedRoute>
            <Residents />
          </ProtectedRoute>
        } />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import UserFactures from "./pages/UserFactures.jsx";
import AdminFactures from "./pages/AdminFactures.jsx";
import Residents from "./pages/Residents.jsx";
import Profile from './pages/profile.jsx';
function App() {


  return (
    <>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/UserFactures" element={<UserFactures/>}/>
            <Route path="/AdminFactures" element={<AdminFactures/>}/>
            <Route path="/Residents" element={<Residents/>}/>
            <Route path='/Profile/:id' element={<Profile/>}/>
        </Routes>
    </>
  )
}

export default App

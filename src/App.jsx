import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
function App() {


  return (
    <>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
    </>
  )
}

export default App

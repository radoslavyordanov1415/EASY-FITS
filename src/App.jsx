import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./index.css"

// Importing all the necessary components
import NavBar from "./components/NavBar/NavBar"
import Register from "./components/Register/Register"
import Logout from "./components/Logout/Logout"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"



function App() {


  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPageFolder/LoginPage'
import SignUp from "./components/SignUpFolder/SignUp"
import ProtectedRoute from './ProtectedRoute'
import Welcome from './components/HomePageFolder/Welcome'
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/welcome" element={<Welcome/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

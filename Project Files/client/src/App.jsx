import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import FlashBar from './components/FlashBar'
import Navbar from './components/Navbar' // Import your new Navbar component
import Logout from './components/Logout'
import PropertyList from './components/PropertyList'
import Support from './components/Support'
import Approval from './components/Approval'

function App() {
  const [flash, setFlash] = useState('');
  const location = useLocation();

  // Define paths where Navbar should be hidden
  const authPaths = ['/', '/login'];
  const shouldShowNavbar = !authPaths.includes(location.pathname);

  useEffect(() => {
    const msg = sessionStorage.getItem('flash');
    if (msg) {
      setFlash(msg);
      sessionStorage.removeItem('flash');
      const timer = setTimeout(() => setFlash(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      {/* 1. FlashBar stays at the absolute top */}
      <FlashBar message={flash} />

      {/* 2. Conditionally render Navbar based on current URL */}
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/logout' element={<Logout />}></Route> 
        <Route path='/search' element={<PropertyList />}></Route> 
        <Route path='/support' element={<Support />}></Route> 
        <Route path='/admin/approvals' element={<Approval />}></Route> 
       
      </Routes>
    </>
  )
}

export default App
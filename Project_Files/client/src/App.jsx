import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Landing from './components/Landing';
import FlashBar from './components/FlashBar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

import AdminHome from './components/modules/admin/AdminHome';
import OwnerHome from './components/modules/owner/OwnerHome';
import RenterHome from './components/modules/renter/RenterHome';

function App() {
  const [flash, setFlash] = useState('');
  const location = useLocation();
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');
  const userType = type ? type.toLowerCase() : null;

  useEffect(() => {
  const msg = sessionStorage.getItem('flash');
  if (msg) {
    setFlash(msg);
    sessionStorage.removeItem('flash');
    
    // Ensure the timer is set to clear the state
    const timer = setTimeout(() => {
      setFlash('');
    }, 4000);

    return () => clearTimeout(timer);
  }
}, [location.pathname]); // Use pathname specifically to detect the landing after reload

  return (
    <div className="dashboard-wrapper">
      <FlashBar message={flash} />
      <Navbar />

      <Routes>
        <Route path='/' element={!token ? <Landing /> : <Navigate to={`/${userType}`} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        
        <Route path='/admin' element={<ProtectedRoute component={AdminHome} requiredType="admin" />} />
        <Route path='/owner' element={<ProtectedRoute component={OwnerHome} requiredType="owner" />} />
        <Route path='/renter' element={<ProtectedRoute component={RenterHome} requiredType="renter" />} />
      </Routes>
    </div>
  )
}

export default App;
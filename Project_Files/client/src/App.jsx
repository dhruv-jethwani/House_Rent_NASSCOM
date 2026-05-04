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
    let timer; // Keeps track of the timeout so messages don't disappear prematurely 

    const handleFlash = () => {
      const msg = sessionStorage.getItem('flash');
      if (msg) {
        setFlash(msg);
        sessionStorage.removeItem('flash');
        
        // Clear existing timer if a new message comes in quickly
        if (timer) clearTimeout(timer);
        
        timer = setTimeout(() => {
          setFlash('');
        }, 4000);
      }
    };

    // 1. Check for flash messages on component mount or route change
    handleFlash();

    // 2. Intercept sessionStorage.setItem to trigger flash instantly on the same page
    const originalSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      // If a flash message is set, alert the app immediately
      if (key === 'flash') {
        window.dispatchEvent(new Event('flashUpdate'));
      }
    };

    // 3. Listen for the custom flash update event
    window.addEventListener('flashUpdate', handleFlash);

    return () => {
      // Cleanup interceptor and listeners on unmount
      window.removeEventListener('flashUpdate', handleFlash);
      sessionStorage.setItem = originalSetItem; 
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <div className="dashboard-wrapper" style={{ paddingTop: '80px' }}>
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
import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import FlashBar from './components/FlashBar'

function App() {
  // flash message state lives at the top of the app. we read from
  // sessionStorage on initialization and also whenever the location
  // changes, which covers the common case where a component stores a
  // message then navigates (e.g. register -> login).
  const [flash, setFlash] = useState('');
  const location = useLocation();

  // whenever the URL changes, attempt to pull a message out of storage
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
      {/* top-level notification bar, displayed on every page when `flash` is set */}
      <FlashBar message={flash} />

      <Routes>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        {/* <Route path='/about' element={<About/>}></Route>
        <Route path='/products' element={<ProductList/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route> */}
      </Routes>
    </>
  )
}

export default App
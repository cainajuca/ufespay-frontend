import React, { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './views/landing-page'
import Home from './views/home'
import Transfer from './views/transfer'

import ProtectedRoute from './components/privateRoute'

function App() {
  
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("autoriza") || "false"))
  
  function authCallback(login) {

    setAuth(login)

  }

  useEffect(() => {
    localStorage.setItem("autoriza", auth)
  }, [auth])

  return (
    <div className="App">

      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<LandingPage callback={(login) => authCallback(login)}/>} />

          <ProtectedRoute 
            path="home" 
            element={<Home />} 
            authorize={auth}/>

          <ProtectedRoute
            path="transfer" 
            element={<Transfer />} 
            authorize={auth}/>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
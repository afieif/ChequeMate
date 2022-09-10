import React from 'react'
import Onboarding from './Onboarding';
import SignUp from './SignUp';
import Home from './Home';
import History from './History';
import { Routes,Route } from "react-router-dom";
import { useAuth } from '../context/UserProvider';

export default function MobileView() {
  const {currentUser} = useAuth();
  

  return (
    <MobileViewRoutes currentUser={currentUser}/>
  )
}


function MobileViewRoutes({currentUser}) {
  return (
    <>
    {
      currentUser?.email?
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="history" element={<History />} />
        </Routes>
    :
      <Routes>
          <Route path="/" element={<Onboarding />}/>
          <Route path="signup" element={<SignUp />} />
          <Route path="history" element={<History />} />
      </Routes>
    }
    </>
  )
}


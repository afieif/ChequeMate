import React from 'react'
import { useAuth } from '../context/UserProvider'

export default function Logout({children}) {
  const {logout} = useAuth();
  function userOut(){
    localStorage.removeItem('email');
    logout();
  }
  return (
    <div onClick={userOut}>
      {children}
    </div>
  )
}

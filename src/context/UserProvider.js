import React, { useContext, useState} from 'react';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}


export function UserProvider({children}) {
    const [currentUser,setCurrentUser] = useState();

    function signIn(email){
        setCurrentUser({email : email});
    }

    function logout(){
        setCurrentUser({email:""});
    }

    const value = {
        currentUser, 
        signIn, 
        logout, 
    }

  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
  );
}
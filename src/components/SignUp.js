import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import server from '../proxy';

export default function SignUp() {
    const [signup, setSignup] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const {signIn} = useAuth();
    const navigate = useNavigate();

    function submit()
    {

        if(password.length < 8)
        {
            if(signup)
            alert("Password Must be atleast 8 characters long"); 
            else 
            alert("Password Incorrect");
            return;
        }
        toggle(setLoading,loading);
        axios({
            method : 'post',
            url : server+'user',
            params : {email : email, password : password, action:"signup"}})
            .then((res)=>{
                  toggle(setLoading,loading);
                  if(res.data === 'success')
                  {
                    signIn(email);
                    localStorage.setItem('email',email);
                    navigate('/');
                  }
                  else
                  {
                    alert('Authentication failed!');
                  }
                })

    }

    function toggle(set,val)
    {
        set(!val);    
    }

  return (
    <div className='screen signup'>
        <div className='signup-container'>
            <div className='signup-text'>
            {signup? "Sign Up " : "Login "}<br/> to Track Your Expenses ✨
            </div>
        </div>
        <div className='signup-container'>
            <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <button className=' signup-button button' onClick={submit}>
                <div className='buttonText'>
                    <strong>{loading? "Loading" : signup? "Sign Up" : "Login"}</strong>
                </div>
            </button>
            <div className='small-text' onClick={()=>{toggle(setSignup,signup)}}>
            {signup? "Already have an account? Login" : "New here? Sign up"}
            </div>
        </div>

    </div>
  )
}

import React, {useEffect} from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import { useAuth } from '../context/UserProvider';


export default function Onboarding() {
    const {signIn} = useAuth();

    useEffect(() => {
        if(localStorage.getItem('email'))
        {
            signIn(localStorage.getItem('email'));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className='screen onboarding'>
        <img src={require('../assets/card.png')} alt='card for aesthetic' className='card-image'/>
        <div className='onboarding-textContainer'>
            <div className='onboarding-text'>
                Cheque Mate 💸
            </div>
            <div className='onboarding-text'>
                Organize Your Expenses
            </div>
        </div>
        <Link to={"signup"}>
            <button className='button'>
                <div className='buttonText'>
                    Get Started
                </div>
            </button>
        </Link>
        
    </div>
  )
}

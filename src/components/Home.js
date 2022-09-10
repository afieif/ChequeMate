import axios from 'axios';
import React, {useState, useEffect} from 'react'
import server from '../proxy';
import { useAuth } from '../context/UserProvider';
import { Link } from 'react-router-dom';
import Logout from './Logout';


export default function Home() {
  const [amount,setAmount] = useState('');
  const [budget,setBudget] = useState('');
  const [loading,setLoading] = useState(false);
  const [update,setUpdate] = useState(false);
  const [category,setCategory] = useState('others')
  const {currentUser} = useAuth();

  useEffect(() => {
    
    axios({
      method : 'get',
      url : server+'user',
      params : currentUser})
      .then((res)=>{
        setBudget(res.data.budget);
      })

  }, [budget, currentUser])

  function updateBudget(action){
    setLoading(true);
    axios({
      method : 'post',
      url : server+'budget',
      params : {email : currentUser.email, amount : amount, action : action, budget: budget, category : category}})
      .then((res)=>{
        console.log(res.data);
        if(res.data === 'success')
        {
          setAmount('');
          if(action === 'add')
          {
            setBudget(budget+amount)
          }
          else
          {
            setBudget(budget-amount)
          }
        }
        else
        {
          console.log(res.data);
          alert('An error occurred, please try again')
        }
        setLoading(false);
      })
  }
  

  function handleKeyboard(num){
    if(num === '&lt;-')
    {
      setAmount(amount.slice(0,-1))
    }
    else if(num ==='✔')
    {
      if(update)
      {
        updateBudget('add');
        setUpdate(!update);
      }
      else
      {
        updateBudget('sub');
      }
    }
    else
    {
      setAmount(amount+num)
    }
  }

  return(
    <div className='screen flex-start'>
      <Link to={'history'}>
      <div className='history-navigate'>History</div>
      </Link>
      <Logout>
      <div className='logout-navigate'>Logout</div>
      </Logout>
      <div className='budget-widget'>
        <div className='budget-text'>Remaining Budget</div>
        <div className='budget-amount'>{loading? "loading.." : `₹ ${budget}`}</div>
        <div className='budget-update' onClick={()=>setUpdate(!update)}>{!update?"Update":"Cancel"}</div>
      </div>
      <div className='update-prompt'>{update? "Enter new budget" : ""}</div>
      <div className='expense-textbox'>₹ {amount}</div>
      <div className='expense-adder'>
        <div className='expense-category-bar' style={update?{display:'none'}:{}}>
          <div className='expense-category' style={category==='grocery'?{backgroundColor : '#B3E0B9'}:{}} onClick={()=>setCategory('grocery')}>Grocery</div>
          <div className='expense-category' style={category==='bills'?{backgroundColor : '#B3E0B9'}:{}} onClick={()=>setCategory('bills')}>Bills</div>
          <div className='expense-category' style={category==='travel'?{backgroundColor : '#B3E0B9'}:{}} onClick={()=>setCategory('travel')}>Travel</div>
          <div className='expense-category' style={category==='others'?{backgroundColor : '#B3E0B9'}:{}} onClick={()=>setCategory('others')}>Others</div>
        </div>
        <div className='expense-numpad' onClick={(e)=>handleKeyboard(e.target.innerHTML)}>
          <div>1</div><div>2</div><div>3</div>
          <div>4</div><div>5</div><div>6</div>
          <div>7</div><div>8</div><div>9</div>
          <div>✔</div><div>0</div><div>{"<-"}</div>
        </div>
      </div>
    </div>
  )
}

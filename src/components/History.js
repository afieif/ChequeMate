import axios from 'axios';
import React,{useEffect, useState} from 'react'
import server from '../proxy';

export default function History() {
    const [expenses,setExpenses] = useState([]);
    const currentUser = {email : localStorage.getItem('email')}

  useEffect(() => {
    axios({
        method : 'get',
        url : server+'expenses',
        params : currentUser})
        .then((res)=>{
            if(res.data === 'fail')
            {
                alert('Error fetching records, please try again');
            }
            else
            {
                setExpenses(res.data);
            } 
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses])

  function deleteExpense(id){
    axios({
        method : 'post',
        url : server+'expenses',
        params : {_id : id}})
        .then((res)=>{
            if(res.data === 'fail')
            {
                alert("Error, Couldn't complete request");
            }
            else
            {
                setExpenses(expenses.filter((e)=>e._id!==id));
            }
        })
  }
  

  return (
    <div className='screen flex-start expenses-parent'>
    <div className='screen-title'>Expense History ⌛</div>
    <div className='expense-item header'>
                    <div className='expense-data'>Date</div>
                    <div className='expense-data'>Amount</div>
                    <div className='expense-data'>Category</div>
                </div>
    {expenses.sort((a,b)=>{
        if(a.year === b.year)
        {
            if(a.month === b.month)
            {
                if(a.day === b.day)
                {
                    return 0;
                }
                else
                {
                    return b.day-a.day;
                }
            }
            else
            {
                return b.month-a.month;
            }
        }
        else
        {
            return b.year-a.year;
        }
    })
        .map((e)=>{
            return(
                <div key={e._id} className='expense-item'>
                    <div className='expense-data'>{e.day}/{e.month}/{e.year}</div>
                    <div className='expense-data'>₹ {e.amount}</div>
                    <div className='expense-data'>{e.category}</div>
                    <div className='expense-data expense-undo' onClick={()=>{deleteExpense(e._id)}}>undo</div>
                </div>
            )
    })}
    </div>
  )
}

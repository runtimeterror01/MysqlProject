import React, { useState,useEffect } from 'react'
import CustomerPage from '../CustomerPage/CustomerPage';
import AdminPage from '../AdminPage/AdminPage';

const Home = () => {
  const [Role, setRole] = useState();

  const userdata=localStorage.getItem('userData');

  useEffect(() => {
    if(userdata)
    {
  const parsedData = JSON.parse(userdata);
  const userRole = parsedData.userRole;
  setRole(userRole);
    }
  }, [])


  return (
    <div>
      {Role==='admin' ? (<AdminPage/>):(<CustomerPage/>)}
      
      
    </div>
  )
}

export default Home
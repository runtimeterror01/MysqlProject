import React,{useEffect, useState} from 'react';
import './navbar.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [UserName, setUserName] = useState()

  const userdata=localStorage.getItem("userData")
  const navigate=useNavigate();
  

  useEffect(() => {
    if(userdata)
    {
  const parsedData = JSON.parse(userdata);
  const username = parsedData.username;
  setUserName(username);
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img src={logo} 
        onClick={()=>{navigate('/')}} alt="logo" 
        />
        </div>
          {UserName && ( <div className="hr-name">{UserName}</div> )}
          <div className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </div>
    </div>
  );
};

export default Navbar;
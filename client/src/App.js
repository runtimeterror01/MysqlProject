import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </div>
  );
}

export default App;

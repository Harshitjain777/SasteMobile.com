import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin=async()=>{
    let result=await fetch("http://localhost:5000/login" , {
        method:'post',
        body:JSON.stringify({email , password}),
        headers:{
            'Content-Type':'application/json'
        }
    });
    result= await result.json();
    if(result){
        localStorage.setItem("user" , JSON.stringify(result));
        navigate('/');
    }
    else{
        alert("Please enter correct details");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    handleLogin();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

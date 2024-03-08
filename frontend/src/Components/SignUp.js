import React, { useState , useEffect} from 'react';
import '../App.css'; // Import the CSS file for styling
import {useNavigate} from 'react-router-dom';

const SignUpForm = () => { 
  const [formData, setFormData] = useState({
    name:'',
    phone: '',
    email: '',
    password: ''
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
})
  const collectData= async ()=>{
    let result= await fetch('http://localhost:5000/register' , {
      method:'post',
      body:JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result=await result.json();
    console.log(result);
    if(result){
      localStorage.setItem("user" , JSON.stringify(result))
      localStorage.setItem('name' , JSON.stringify(formData.name));
      navigate('/')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    collectData();
    // Add your form submission logic here
  };


  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;

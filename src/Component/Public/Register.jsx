import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    const URL = "http://localhost:8080/api/v1/register";
    const body = {
      email: email,
      password: password,
      userRole: role
    };

    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const response = await axios.post(URL, body, headers);
      console.log('Registration successful:', response.data); 
      sessionStorage.setItem("email", response.data.data.email);
      Navigate("/verify-otp");
    } catch (error) {
      console.error('Registration failed:', error.response.data); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email:</label>
            <input type="email" value={email} placeholder="Email" onChange={handleEmailChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Password:</label>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="w-full p-2 border rounded-md" required />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

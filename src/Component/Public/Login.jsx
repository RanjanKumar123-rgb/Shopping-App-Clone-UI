import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {auth, setAuth}= useAuth();
  const Navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Login Requested');
    console.log('Email:', email);
    console.log('Password:', password);

    // Will Reset previous error messages
    setEmailError('');
    setPasswordError('');

    validateEmail(email);
    validatePassword(password);

    // Wont allow to login if there are validation errors
    if (emailError || passwordError) {
      return; // Exit early if there are validation errors
    }

    const URL = "http://localhost:8080/api/v1/login";
    const body = {
      email: email,
      password: password,
    };

    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const response = await axios.post(URL, body, headers);
      if(response.status === 200)
      {
        console.log('Login successful:', response.data);
        const user = {
          userId:response.data.data.userId,
          username:response.data.data.username,
          role:response.data.data.role,
          isAuthenticated:response.data.data.authenticated,
          accessExpiration:response.data.data.accessExpiration,
          refreshExpiration:response.data.data.refreshExpiration
        }
        setAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(auth);
        Navigate("/")
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"  type="email"  placeholder="Email"  value={email}  onChange={handleEmailChange}  required/>
                {emailError && <p className="text-red-500">{emailError}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}  required/>
                {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Log In
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    // flex items-center justify-center min-h-screen
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <img src="/Pics/Shopping.jpg" alt="" />
      </div>
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
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}  required/>
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
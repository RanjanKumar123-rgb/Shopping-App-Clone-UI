import React, { useState } from 'react';

const Register = (role) => {
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

    console.log('Form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log(role);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md justify-center">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} className="w-full p-2 border rounded-md" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} className="w-full p-2 border rounded-md" required />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

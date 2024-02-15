import axios from 'axios';
import React, { useState, useRef } from 'react';

const VerifyOTP = () => {
  const email = sessionStorage.getItem('email');
  const [otp, setOTP] = useState([null, null, null, null, null, null]);
  const otpInputs = useRef([]);

  const handleChange = (index, value) => {
    // Ensure that only numeric values are accepted
    if (!isNaN(value) && value !== '') {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus next input
      if (index < otp.length - 1) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Focus previous input on backspace if current input is empty
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.map(digit => digit !== null ? digit.toString() : '').join('');

    const URL = "http://localhost:8080/api/v1/verify-otp";
    const body = {
      email: email,
      otp: enteredOTP
    };

    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const response = await axios.post(URL, body, headers);
      console.log('OTP Verified:', response.data); 
      sessionStorage.removeItem("email");
    } catch (error) {
      console.error('OTP Verification failed:', error.response.data); 
    }
    console.log('OTP Entered:',otp)
  };

  const handleResendOTP = () => {
    // Logic to resend OTP
    console.log('Resend OTP');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-md">
        <div className="text-lg font-semibold text-gray-800 mb-6 text-center">Please enter the OTP to verify your account</div>
        <div className="text-sm font-semibold text-gray-800 mb-6 text-center">A One Time Password has been sent to your mail</div>
        <form className="w-full flex justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={ref => (otpInputs.current[index] = ref)}
              type="number"
              maxLength="1"
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="w-12 h-12 text-3xl text-center border rounded mx-1 focus:outline-none focus:ring focus:border-blue-500"
            />
          ))}
        </form>
        <button onClick={handleVerifyOTP} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline mb-4">
          Validate
        </button>
        <div className="text-center">
          <a href="#" onClick={handleResendOTP} className="text-blue-500 font-semibold hover:text-blue-600">
            Resend OTP
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <p className="text-red-500">{error}</p>
  );
};

export default ErrorMessage;

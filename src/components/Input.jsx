import React from 'react';

//  INPUT: Reusable input field with consistent styling
// Connected to: CreateAssignment (used in form fields)
const Input = ({ type = 'text', className = '', ...props }) => {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
};

export default Input;
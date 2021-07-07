import React from 'react';

const TextInput = ({ rhfRegister, label, ...rest }) => {
  return (
    <>
      {label && <label>Email address</label>}
      <input
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        {...rest}
        {...rhfRegister}
      />
    </>
  );
};

export default TextInput;

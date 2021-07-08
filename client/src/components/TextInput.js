import React from 'react';

const TextInput = ({ rhfRegister, label, ...rest }) => {
  return (
    <>
      {label && <label>Email address</label>}
      <input {...rest} {...rhfRegister} />
    </>
  );
};

export default TextInput;

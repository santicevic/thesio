import React from 'react';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const TextInput = ({ name, control, defaultValue = '', ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => <TextField {...rest} {...field} />}
    />
  );
};

export default TextInput;

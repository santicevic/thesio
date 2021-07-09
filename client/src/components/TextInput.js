import React from 'react';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const TextInput = ({ name, control, defaultValue = '', errors = {}, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => <TextField error={!!errors[name]} margin="normal" {...rest} {...field} />}
    />
  );
};

export default TextInput;

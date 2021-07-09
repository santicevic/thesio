import React from 'react';
import { Select, MenuItem, makeStyles, InputLabel, FormControl } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const SelectInput = ({ name, control, label, defaultValue = '', options = [], errors, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControl {...rest}>
      <InputLabel shrink>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select className={classes.select} error={!!errors[name]} {...rest} {...field} value={field.value || ''}>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectInput;

const useStyles = makeStyles({
  select: {
    marginTop: '16px',
    marginBottom: '8px',
  },
});

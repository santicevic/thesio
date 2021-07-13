import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Controller } from 'react-hook-form';

const TextInput = ({ name, control, errors = {}, ...rest }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <KeyboardDatePicker
            error={!!errors[name]}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            {...rest}
            {...field}
            ref={undefined}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TextInput;

import React from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Controller } from 'react-hook-form';

const TextInput = ({ name, control, errors = {}, ...rest }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <KeyboardDateTimePicker
            error={!!errors[name]}
            variant="inline"
            format="MM/dd/yyyy HH:mm"
            ampm
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

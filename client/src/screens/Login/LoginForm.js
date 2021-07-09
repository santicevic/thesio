import React from 'react';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import authApi from '../../api/auth';
import TextInput from '../../components/TextInput';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants';

const LoginForm = () => {
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const onSubmit = async data => {
    const user = await authApi.login(data);
    history.push(ROUTES[user.role.toLowerCase()].base.href);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="email"
        control={control}
        variant="outlined"
        fullWidth
        label="Email Adresa"
        autoComplete="email"
      />
      <TextInput
        name="password"
        control={control}
        variant="outlined"
        fullWidth
        label="Lozinka"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Prijavi se
      </Button>
    </form>
  );
};

export default LoginForm;

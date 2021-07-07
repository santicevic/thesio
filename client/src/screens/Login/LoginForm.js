import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import authApi from '../../api/auth';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => authApi.login(data);

  return (
    <form className="mt-8 space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <TextInput type="email" placeholder="Email" autoComplete="email" rhfRegister={register('email')} />
        <TextInput
          type="password"
          placeholder="Lozinka"
          autoComplete="current-password"
          rhfRegister={register('password')}
        />
      </div>
      <Button label="Prijavi se" type="submit" />
    </form>
  );
};

export default LoginForm;

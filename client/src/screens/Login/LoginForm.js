import React from 'react';
import { Button, Container, Avatar, Typography, makeStyles } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import authApi from '../../api/auth';
import TextInput from '../../components/TextInput';

const LoginForm = () => {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const onSubmit = data => authApi.login(data);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Prijava
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="email"
            control={control}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Adresa"
            autoComplete="email"
          />
          <TextInput
            name="password"
            control={control}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Lozinka"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Prijavi se
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

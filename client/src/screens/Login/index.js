import React from 'react';
import { Container, Avatar, Typography, makeStyles, Paper } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import LoginForm from './LoginForm';

const LoginScreen = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <Paper elevation={2} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Prijava
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default LoginScreen;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 'calc(100vh - 80px)',
  },
  paper: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

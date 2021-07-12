import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import authApi from '../api/auth';
import { queryClient } from '..';

const AppBarLayout = ({ children, title }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = async () => {
    await authApi.logout();
    await queryClient.removeQueries();
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <IconButton onClick={handleLogout}>
            <ExitToAppIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Toolbar />
        {children}
      </div>
    </div>
  );
};

export default AppBarLayout;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    color: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

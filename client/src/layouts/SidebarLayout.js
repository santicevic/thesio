import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  IconButton,
  Divider,
  Box,
  Avatar,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import authApi from '../api/auth';
import { queryClient } from '..';
import usersApi from '../api/users';
import { STUDIES_TRANSLATION } from '../constants';

const SidebarLayout = ({ children, title, items }) => {
  const { data } = useQuery('me', usersApi.me);
  const classes = useStyles();
  const location = useLocation();
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
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          {data && (
            <Box display="flex" p={2} alignItems="center" flexDirection="column">
              <Avatar />
              <Typography variant="h6">
                {data.firstName} {data.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {data.email}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {STUDIES_TRANSLATION[data.study]}
              </Typography>
            </Box>
          )}
          <Divider />
          <List>
            {items.map(({ text, Icon, href }) => (
              <Link key={text} to={href} className={classes.link}>
                <ListItem button selected={location.pathname === href}>
                  <ListItemIcon>{<Icon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
      <div className={classes.content}>
        <Toolbar />
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.black,
  },
  icon: {
    color: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

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
} from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import authApi from '../api/auth';

const SidebarLayout = ({ children, title, items }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    await authApi.logout();
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

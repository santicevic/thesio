import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ROLES } from '../constants';
import LoginScreen from '../screens/Login';
import ProtectedRoute from './ProtectedRoute';
import RoleRouter from './RoleRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <ProtectedRoute path="/" roles={Object.values(ROLES)}>
          <RoleRouter />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

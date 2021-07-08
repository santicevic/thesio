import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginScreen from '../screens/Login';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute roles={['ADMIN']} path="/protected">
          <h1>Welcome</h1>
        </ProtectedRoute>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

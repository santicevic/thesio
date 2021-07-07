import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginScreen from './screens/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

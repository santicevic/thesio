import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import usersApi from '../api/users';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      setUser(await usersApi.me());
    })();
  }, []);

  if (!user) return null;

  if (!roles.includes(user.role)) return <h1>Unauthorized</h1>;

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PrivateRoute;

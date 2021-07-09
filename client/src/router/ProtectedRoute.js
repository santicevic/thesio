import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import usersApi from '../api/users';
import Unauthorized from './Unauthorized';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { data, error } = useQuery('me', usersApi.me, { retry: false });
  const history = useHistory();

  useEffect(() => {
    if (error) history.push('/login');
  }, [error, history]);

  if (!data) return null;

  if (!roles.includes(data.role)) return <Unauthorized role={data.role} />;

  return <Route {...rest} />;
};

export default PrivateRoute;

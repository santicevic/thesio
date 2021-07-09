import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  CircularProgress,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import usersApi from '../../api/users';

const UsersList = () => {
  const { data } = useQuery('users', usersApi.getAll);

  if (!data) return <CircularProgress size={24} />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>E-mail</TableCell>
            <TableCell>Ime</TableCell>
            <TableCell>Prezime</TableCell>
            <TableCell>Rola</TableCell>
            <TableCell>Smjer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, email, firstName, lastName, role, study }) => (
            <TableRow key={id}>
              <TableCell>{email}</TableCell>
              <TableCell>{firstName}</TableCell>
              <TableCell>{lastName}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell>{study}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;

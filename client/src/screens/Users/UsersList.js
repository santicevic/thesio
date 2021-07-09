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
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useQuery } from 'react-query';
import usersApi from '../../api/users';

const UsersList = ({ handleUserEdit }) => {
  const classes = useStyles();
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(user => (
            <TableRow hover key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.study}</TableCell>
              <TableCell>
                <IconButton className={classes.iconButton} onClick={() => handleUserEdit(user)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;

const useStyles = makeStyles({
  iconButton: {
    padding: 0,
  },
});

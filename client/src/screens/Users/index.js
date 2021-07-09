import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import UsersList from './UsersList';
import UserAddEdit from './UserAddEdit';

const Users = () => {
  const [userToAddEdit, setUserToAddEdit] = useState(null);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" paddingY={2}>
        <Button variant="contained" color="primary" onClick={() => setUserToAddEdit({})}>
          Dodaj korisnika
        </Button>
      </Box>
      <UsersList />
      <UserAddEdit userToAddEdit={userToAddEdit} handleClose={() => setUserToAddEdit(null)} />
    </>
  );
};

export default Users;

import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import SubjectsList from './SubjectsList';
import SubjectsAddEdit from './SubjectsAddEdit';

const Users = () => {
  const [subjectToAddEdit, setSubjectToAddEdit] = useState(null);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" paddingY={2}>
        <Button variant="contained" color="primary" onClick={() => setSubjectToAddEdit({})}>
          Dodaj kolegij
        </Button>
      </Box>
      <SubjectsList handleSubjectEdit={setSubjectToAddEdit} />
      <SubjectsAddEdit subjectToAddEdit={subjectToAddEdit} handleClose={() => setSubjectToAddEdit(null)} />
    </>
  );
};

export default Users;

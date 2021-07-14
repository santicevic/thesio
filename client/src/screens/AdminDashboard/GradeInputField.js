import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import applicationsApi from '../../api/applications';
import { queryClient } from '../..';

const GradeInputField = ({ applicationId }) => {
  const [grade, setGrade] = useState(1);

  const handleChange = ({ target }) => {
    if (!target.value || target.value > 5 || target.value < 1) return setGrade(1);
    setGrade(target.value);
  };

  const handleSubmit = async () => {
    await applicationsApi.setGrade({ applicationId, grade });
    queryClient.invalidateQueries('pendingGradeApplications');
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField type="number" value={grade} onChange={handleChange} InputProps={{ inputProps: { min: 1, max: 5 } }} />
      <IconButton color="primary" onClick={handleSubmit}>
        <SaveIcon />
      </IconButton>
    </Box>
  );
};

export default GradeInputField;

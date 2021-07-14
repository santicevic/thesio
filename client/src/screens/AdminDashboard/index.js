import React from 'react';
import { Grid } from '@material-ui/core';
import Statistics from './Statistics';
import DefenseApplyList from './DefenseApplyList';
import GradeInputList from './GradeInputList';

const AdminDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Statistics />
      <DefenseApplyList />
      <GradeInputList />
    </Grid>
  );
};

export default AdminDashboard;

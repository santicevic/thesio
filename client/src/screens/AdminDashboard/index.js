import React from 'react';
import { Grid } from '@material-ui/core';
import Statistics from './Statistics';

const AdminDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Statistics />
    </Grid>
  );
};

export default AdminDashboard;

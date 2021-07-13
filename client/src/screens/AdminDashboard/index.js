import React from 'react';
import { Grid } from '@material-ui/core';
import Statistics from './Statistics';
import AdminApplications from './AdminApplications';

const AdminDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Statistics />
      <AdminApplications />
    </Grid>
  );
};

export default AdminDashboard;

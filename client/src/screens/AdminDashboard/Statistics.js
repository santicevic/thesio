import React from 'react';
import { Grid, Paper, makeStyles, CircularProgress, Typography, Box } from '@material-ui/core';
import { People as PeopleIcon, LibraryBooks as LibraryBooksIcon, CalendarToday } from '@material-ui/icons';
import { useQueries } from 'react-query';
import usersApi from '../../api/users';
import subjectsApi from '../../api/subjects';
import configApi from '../../api/config';

const Statistics = () => {
  const classes = useStyles();
  const [usersResult, subjectsResult, configYearResult] = useQueries([
    { queryKey: 'usersCount', queryFn: usersApi.count },
    { queryKey: 'subjectsCount', queryFn: subjectsApi.count },
    { queryKey: 'configYear', queryFn: () => configApi.getConfig('year') },
  ]);

  return (
    <>
      <Grid item xs={4}>
        <Paper className={classes.paper} elevation={3}>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography variant="h5">Korisnici</Typography>
              <Typography variant="h6">{usersResult?.data || <CircularProgress size={24} />}</Typography>
            </div>
            <PeopleIcon />
          </Box>
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Paper className={classes.paper} elevation={3}>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography variant="h5">Predmeti</Typography>
              <Typography variant="h6">{subjectsResult?.data || <CircularProgress size={24} />}</Typography>
            </div>
            <LibraryBooksIcon />
          </Box>
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Paper className={classes.paper} elevation={3}>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography variant="h5">Godina</Typography>
              <Typography variant="h6">{configYearResult?.data.value || <CircularProgress size={24} />}</Typography>
            </div>
            <CalendarToday />
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default Statistics;

const useStyles = makeStyles({
  paper: {
    padding: '10px',
  },
});

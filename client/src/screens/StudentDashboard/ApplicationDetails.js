import React from 'react';
import { useQuery } from 'react-query';
import { Paper, Typography, Divider, Chip, makeStyles, Box, Button, Grid } from '@material-ui/core';
import { format } from 'date-fns';
import { Person as PersonIcon, SupervisorAccount as SupervisorAccountIcon } from '@material-ui/icons';
import applicationsApi from '../../api/applications';
import {
  APPLICATION_STATUS,
  APPLICATION_STATUS_TRANSLATION,
  LEVELS_TRANSLATION,
  STUDIES_TRANSLATION,
} from '../../constants';
import { queryClient } from '../..';

const ApplicationDetails = () => {
  const classes = useStyles();
  const { data } = useQuery('application', applicationsApi.getApplication);

  if (!data) return null;

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant="h5">{data.topic.title}</Typography>
      <Typography variant="h6" color="textSecondary">
        {STUDIES_TRANSLATION[data.student.study]} - {LEVELS_TRANSLATION[data.student.studentLevel]} ({data.year})
      </Typography>
      <Chip
        className={classes.chip}
        color="primary"
        avatar={<PersonIcon className={classes.icon} />}
        label={`${data.student.firstName} ${data.student.lastName}`}
      />
      <Chip
        className={classes.chip}
        color="secondary"
        avatar={<SupervisorAccountIcon className={classes.icon} />}
        label={`${data.mentor.firstName} ${data.mentor.lastName}`}
      />
      <Box marginY={2}>
        <Typography variant="body1">{data.topic.description}</Typography>
      </Box>
      <Divider />
      <Grid container>
        <Grid item md={6} xs={12}>
          <Box marginTop={2} marginBottom={1}>
            <Typography variant="body1">Status: {APPLICATION_STATUS_TRANSLATION[data.status]}</Typography>
            <Typography variant="body1">Prijavljeno: {format(new Date(data.applicationDate), 'MM/dd/yyyy')}</Typography>
            <Typography variant="body1">
              Obrana: {data.defenseDate ? format(new Date(data.defenseDate), 'MM/dd/yyyy HH:MM') : 'Nije prijavljena'}
            </Typography>
            <Typography variant="body1">Ocjena: {data.grade || 'Nije ocijenjeno'}</Typography>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" height="100%">
            <Button
              color="primary"
              variant="contained"
              disabled={data.status !== APPLICATION_STATUS.DRAFT}
              onClick={async () => {
                await applicationsApi.applyDefense();
                queryClient.invalidateQueries('application');
              }}
            >
              Prijavi obranu
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ApplicationDetails;

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
  },
  chip: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  icon: {
    backgroundColor: 'transparent !important',
  },
}));

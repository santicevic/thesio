import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Divider,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  CircularProgress,
  Button,
  Box,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import DefenseApplyForm from './DefenseApplyForm';
import applicationsApi from '../../api/applications';
import { LEVELS_TRANSLATION } from '../../constants';

const DefenseApplyList = () => {
  const classes = useStyles();
  const { data } = useQuery('pendingDefenseApplications', applicationsApi.getPendingDefenses);
  const [applicationToPromote, setApplicationToPromote] = useState(null);

  if (!data) return <CircularProgress size={24} />;

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            Prijave obrane
          </Typography>
          <Divider />
          {data.length ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tema</TableCell>
                    <TableCell>Razina</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Mentor</TableCell>
                    <TableCell>Datum prijave teme</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(application => (
                    <TableRow hover key={application.id}>
                      <TableCell>{application.topic.title}</TableCell>
                      <TableCell>{LEVELS_TRANSLATION[application.student.studentLevel]}</TableCell>
                      <TableCell>
                        {application.student.firstName} {application.student.lastName}
                      </TableCell>
                      <TableCell>
                        {application.mentor.firstName} {application.mentor.lastName}
                      </TableCell>
                      <TableCell>{format(new Date(application.applicationDate), 'MM/dd/yyyy')}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setApplicationToPromote(application)}
                        >
                          Prijavi
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box m={1}>
              <Typography varaint="h5">Trenutno nema prijavljenih obrana</Typography>
            </Box>
          )}
        </Paper>
      </Grid>
      <DefenseApplyForm applicationToPromote={applicationToPromote} handleClose={() => setApplicationToPromote(null)} />
    </>
  );
};

export default DefenseApplyList;

const useStyles = makeStyles({
  paper: {
    padding: '10px',
  },
  title: {
    margin: '10px 0',
  },
});

import React from 'react';
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
  Box,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import applicationsApi from '../../api/applications';
import GradeInputField from './GradeInputField';
import { LEVELS_TRANSLATION } from '../../constants';

const GradeInputList = () => {
  const classes = useStyles();
  const { data } = useQuery('pendingGradeApplications', applicationsApi.getPendingGrade);

  if (!data) return <CircularProgress size={24} />;

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            Unesi ocjenu
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
                    <TableCell>Datum obrane</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(({ id, topic, student, mentor, applicationDate, defenseDate }) => (
                    <TableRow hover key={id}>
                      <TableCell>{topic.title}</TableCell>
                      <TableCell>{LEVELS_TRANSLATION[student.studentLevel]}</TableCell>
                      <TableCell>
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>
                        {mentor.firstName} {mentor.lastName}
                      </TableCell>
                      <TableCell>{format(new Date(applicationDate), 'MM/dd/yyyy')}</TableCell>
                      <TableCell>{format(new Date(defenseDate), 'MM/dd/yyyy')}</TableCell>
                      <TableCell>
                        <GradeInputField applicationId={id} />
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
    </>
  );
};

export default GradeInputList;

const useStyles = makeStyles({
  paper: {
    padding: '10px',
  },
  title: {
    margin: '10px 0',
  },
});

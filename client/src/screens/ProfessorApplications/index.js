import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  CircularProgress,
  IconButton,
  Box,
} from '@material-ui/core';
import { Check as CheckIcon, Clear as ClearIcon } from '@material-ui/icons';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import applicationsApi from '../../api/applications';
import { APPLICATION_STATUS, APPLICATION_STATUS_TRANSLATION } from '../../constants';
import { queryClient } from '../..';

const ProfessorApplications = () => {
  const { data } = useQuery('applications', applicationsApi.getMentorApplications);

  const acceptApplication = async (applicationId, accepted) => {
    await applicationsApi.mentorAccept({ accepted, applicationId });
    queryClient.invalidateQueries('applications');
  };

  if (!data) return <CircularProgress size={24} />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tema</TableCell>
            <TableCell>Student</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Datum prijave</TableCell>
            <TableCell>Datum obrane</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, topic, applicationDate, student, defenseDate, status }) => (
            <TableRow hover key={id}>
              <TableCell>{topic.title}</TableCell>
              <TableCell>
                {student.firstName} {student.lastName}
              </TableCell>
              <TableCell>{APPLICATION_STATUS_TRANSLATION[status]}</TableCell>
              <TableCell>{format(new Date(applicationDate), 'MM/dd/yyyy')}</TableCell>
              <TableCell>{defenseDate ? format(new Date(defenseDate), 'MM/dd/yyyy') : 'Nije definirano'}</TableCell>
              <TableCell>
                <Box display="flex">
                  <IconButton
                    onClick={() => acceptApplication(id, false)}
                    disabled={status !== APPLICATION_STATUS.PENDING_MENTOR}
                    color="secondary"
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => acceptApplication(id, true)}
                    disabled={status !== APPLICATION_STATUS.PENDING_MENTOR}
                    color="primary"
                  >
                    <CheckIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfessorApplications;

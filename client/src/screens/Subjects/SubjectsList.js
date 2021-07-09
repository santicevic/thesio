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
  makeStyles,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useQuery } from 'react-query';
import subjectsApi from '../../api/subjects';

const SubjectsList = ({ handleSubjectEdit }) => {
  const classes = useStyles();
  const { data } = useQuery('subjects', subjectsApi.getAll);

  if (!data) return <CircularProgress size={24} />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ime</TableCell>
            <TableCell>Smjer</TableCell>
            <TableCell>Profesor</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(subject => (
            <TableRow hover key={subject.id}>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.study}</TableCell>
              <TableCell>{`${subject.professor.firstName} ${subject.professor.lastName}`}</TableCell>
              <TableCell>
                <IconButton className={classes.iconButton} onClick={() => handleSubjectEdit(subject)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectsList;

const useStyles = makeStyles({
  iconButton: {
    padding: 0,
  },
});

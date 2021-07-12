import React, { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles, Box, Chip } from '@material-ui/core';
import { Face as FaceIcon } from '@material-ui/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import SelectInput from '../../components/SelectInput';
import { STUDIES, LEVELS } from '../../constants';
import usersApi from '../../api/users';
import { queryClient } from '../../index';
import { useQuery } from 'react-query';
import subjectsApi from '../../api/subjects';

const SubjectsAddEdit = ({ subjectToAddEdit, handleClose }) => {
  const classes = useStyles();
  const { data: professorData } = useQuery('professors', usersApi.getProfessors);
  const { data: studentsData } = useQuery('students', usersApi.getStudents);
  const [studentsToAdd, setStudentsToAdd] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const isEdit = !!subjectToAddEdit?.id;

  const student = watch('student');

  const availableStudents = useMemo(() => {
    if (!studentsData) return [];
    if (!studentsToAdd.length) return studentsData;

    return studentsData.filter(({ id }) => !studentsToAdd.some(studentToAdd => studentToAdd.id === id));
  }, [studentsData, studentsToAdd]);

  useEffect(() => {
    if (!subjectToAddEdit) return reset();
    setStudentsToAdd(subjectToAddEdit.students || []);
    Object.keys(schema.fields).forEach(field => {
      setValue(field, subjectToAddEdit[field] || '');
    });
    setValue('professor', subjectToAddEdit?.professor?.id);
    setValue('student', undefined);
  }, [subjectToAddEdit, reset, setValue]);

  const onSubmit = async formData => {
    const saveOperation = isEdit ? subjectsApi.update : subjectsApi.create;
    await saveOperation({ ...subjectToAddEdit, ...formData, students: studentsToAdd });
    queryClient.invalidateQueries('subjects');
    handleClose();
  };

  const handleAddStudent = () => {
    setStudentsToAdd(prevState => [...prevState, student]);
    setValue('student', undefined);
  };

  const handleRemoveStudent = studentToRemove => {
    setStudentsToAdd(prevState => prevState.filter(({ id }) => !(studentToRemove.id === id)));
  };

  return (
    <Dialog open={!!subjectToAddEdit} onClose={handleClose}>
      <DialogTitle>{isEdit ? 'Uredi' : 'Dodaj'} kolegij</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.content}>
          <TextInput name="name" errors={errors} control={control} fullWidth label="Ime" />
          <SelectInput
            name="study"
            errors={errors}
            control={control}
            fullWidth
            label="Smjer"
            options={Object.values(STUDIES).map(study => ({ value: study, label: study }))}
          />
          <SelectInput
            name="professor"
            errors={errors}
            control={control}
            fullWidth
            label="Profesor"
            options={
              professorData?.map(({ firstName, lastName, id }) => ({ value: id, label: `${firstName} ${lastName}` })) ||
              []
            }
          />
          <SelectInput
            name="level"
            errors={errors}
            control={control}
            fullWidth
            label="Razina"
            options={Object.values(LEVELS).map(level => ({ value: level, label: level }))}
          />
          <Box display="flex">
            <SelectInput
              name="student"
              errors={errors}
              style={{ flexGrow: 1, marginRight: '5px' }}
              control={control}
              label="Student"
              options={availableStudents.map(availableStudent => ({
                value: availableStudent,
                label: `${availableStudent.firstName} ${availableStudent.lastName}`,
              }))}
            />
            <Button variant="contained" color="primary" onClick={handleAddStudent} disabled={!student}>
              Dodaj
            </Button>
          </Box>
          {studentsToAdd.map(studentToAdd => (
            <Chip
              key={studentToAdd.id}
              className={classes.chip}
              icon={<FaceIcon />}
              label={`${studentToAdd.firstName} ${studentToAdd.lastName}`}
              onDelete={() => handleRemoveStudent(studentToAdd)}
              color="secondary"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Odustani
          </Button>
          <Button type="submit" color="primary">
            Spremi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SubjectsAddEdit;

const schema = yup.object().shape({
  name: yup.string().required(),
  study: yup.string().required(),
  level: yup.string().required(),
  professor: yup.number().required(),
});

const useStyles = makeStyles({
  content: {
    width: '400px',
  },
  chip: {
    margin: '2px',
  },
});

import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import SelectInput from '../../components/SelectInput';
import { STUDIES } from '../../constants';
import usersApi from '../../api/users';
import { queryClient } from '../../index';
import { useQuery } from 'react-query';
import subjectsApi from '../../api/subjects';

const SubjectsAddEdit = ({ subjectToAddEdit, handleClose }) => {
  const classes = useStyles();
  const { data } = useQuery('professors', usersApi.getProfessors);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const isEdit = !!subjectToAddEdit?.id;

  useEffect(() => {
    if (!subjectToAddEdit) return reset();
    Object.keys(schema.fields).forEach(field => {
      setValue(field, subjectToAddEdit[field] || '');
    });
    setValue('professor', subjectToAddEdit?.professor?.id);
  }, [subjectToAddEdit, reset, setValue]);

  const onSubmit = async formData => {
    const saveOperation = isEdit ? subjectsApi.update : subjectsApi.create;
    await saveOperation({ ...subjectToAddEdit, ...formData });
    queryClient.invalidateQueries('subjects');
    handleClose();
  };

  return (
    <Dialog open={!!subjectToAddEdit} onClose={handleClose}>
      <DialogTitle>Dodaj predmet</DialogTitle>
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
              data?.map(({ firstName, lastName, id }) => ({ value: id, label: `${firstName} ${lastName}` })) || []
            }
          />
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
  professor: yup.number().required(),
});

const useStyles = makeStyles({
  content: {
    width: '300px',
  },
});

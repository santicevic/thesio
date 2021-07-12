import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import SelectInput from '../../components/SelectInput';
import { ROLES, STUDIES, LEVELS } from '../../constants';
import usersApi from '../../api/users';
import { queryClient } from '../../index';

const UserAddEdit = ({ userToAddEdit, handleClose }) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const isEdit = !!userToAddEdit?.id;
  const pickedRole = watch('role');
  useEffect(() => {
    if (!userToAddEdit) return reset();
    Object.keys(schema.fields).forEach(field => {
      setValue(field, userToAddEdit[field] || '');
    });
  }, [userToAddEdit, reset, setValue]);

  const onSubmit = async data => {
    const saveOperation = isEdit ? usersApi.update : usersApi.create;
    await saveOperation({ ...userToAddEdit, ...data });
    queryClient.invalidateQueries('users');
    handleClose();
  };

  return (
    <Dialog open={!!userToAddEdit} onClose={handleClose}>
      <DialogTitle>{isEdit ? 'Uredi' : 'Dodaj'} korisnika</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.content}>
          <TextInput name="firstName" errors={errors} control={control} fullWidth label="Ime" />
          <TextInput name="lastName" errors={errors} control={control} fullWidth label="Prezime" />
          <TextInput
            name="email"
            errors={errors}
            control={control}
            fullWidth
            label="Email Adresa"
            autoComplete="email"
          />
          {!isEdit && (
            <TextInput
              name="password"
              errors={errors}
              control={control}
              fullWidth
              label="Lozinka"
              type="password"
              autoComplete="current-password"
            />
          )}
          <SelectInput
            name="role"
            errors={errors}
            control={control}
            fullWidth
            label="Rola"
            options={Object.values(ROLES).map(role => ({ value: role, label: role }))}
          />
          <SelectInput
            name="study"
            errors={errors}
            control={control}
            fullWidth
            label="Smjer"
            options={Object.values(STUDIES).map(study => ({ value: study, label: study }))}
          />
          {pickedRole === ROLES.STUDENT && (
            <SelectInput
              name="studentLevel"
              errors={errors}
              control={control}
              fullWidth
              label="Razina"
              options={Object.values(LEVELS).map(level => ({ value: level, label: level }))}
            />
          )}
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

export default UserAddEdit;

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required(),
  study: yup.string().required(),
  studentLevel: yup.string().when('role', (role, field) => (role === ROLES.STUDENT ? field.required() : field)),
});

const useStyles = makeStyles({
  content: {
    minWidth: '300px',
  },
});

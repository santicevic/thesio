import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import SelectInput from '../../components/SelectInput';
import { ROLES, STUDIES } from '../../constants';
import usersApi from '../../api/users';
import { queryClient } from '../../index';

const UserAddEdit = ({ userToAddEdit, handleClose }) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onClose = () => {
    reset();
    handleClose();
  };

  const onSubmit = async data => {
    await usersApi.create(data);
    queryClient.invalidateQueries('users');
    onClose();
  };

  return (
    <Dialog open={!!userToAddEdit} onClose={onClose}>
      <DialogTitle>Dodaj korisnika</DialogTitle>
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
          <TextInput
            name="password"
            errors={errors}
            control={control}
            fullWidth
            label="Lozinka"
            type="password"
            autoComplete="current-password"
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
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
  password: yup.string().min(6).required(),
  role: yup.string().required(),
  study: yup.string().required(),
});

const useStyles = makeStyles({
  content: {
    minWidth: '300px',
  },
});

import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles, Typography } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import usersApi from '../../api/users';
import { useQuery } from 'react-query';
import SelectInput from '../../components/SelectInput';
import DateInput from '../../components/DateInput';
import applicationsApi from '../../api/applications';
import { queryClient } from '../..';

const PromoteApplication = ({ applicationToPromote, handleClose }) => {
  const classes = useStyles();
  const [hasDuplicate, setHasDuplicate] = useState(false);
  const { data } = useQuery('professors', usersApi.getProfessors);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (applicationToPromote) return setValue('mentor', applicationToPromote.mentor.id);
    reset();
    setHasDuplicate(false);
  }, [applicationToPromote, reset, setValue]);

  const onSubmit = async formData => {
    const hasDuplicates = new Set(Object.values(formData)).size !== Object.values(formData).length;
    if (hasDuplicates) return setHasDuplicate(true);
    await applicationsApi.scheduleDefense({ ...formData, applicationId: applicationToPromote.id });
    queryClient.invalidateQueries('applications');
    handleClose();
  };

  return (
    <Dialog open={!!applicationToPromote} onClose={handleClose}>
      <DialogTitle>Prijavi obranu na temu: "{applicationToPromote?.topic.title}"</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.content}>
          <DateInput name="defenseDate" errors={errors} control={control} label="Datum obrane" fullWidth />
          <SelectInput
            name="mentor"
            errors={errors}
            control={control}
            disabled
            fullWidth
            label="Mentor"
            options={
              data?.map(({ firstName, lastName, id }) => ({ value: id, label: `${firstName} ${lastName}` })) || []
            }
          />
          <SelectInput
            name="president"
            errors={errors}
            control={control}
            fullWidth
            label="Predsjednik"
            options={
              data?.map(({ firstName, lastName, id }) => ({ value: id, label: `${firstName} ${lastName}` })) || []
            }
          />
          <SelectInput
            name="third"
            errors={errors}
            control={control}
            fullWidth
            label="Treći član"
            options={
              data?.map(({ firstName, lastName, id }) => ({ value: id, label: `${firstName} ${lastName}` })) || []
            }
          />
          <SelectInput
            name="fourth"
            errors={errors}
            control={control}
            fullWidth
            label="Četvrti član"
            options={
              data?.map(({ firstName, lastName, id }) => ({ value: id, label: `${firstName} ${lastName}` })) || []
            }
          />
          {hasDuplicate && <Typography color="textSecondary">Nije moguće dodati istog profesora više puta</Typography>}
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

export default PromoteApplication;

const schema = yup.object().shape({
  president: yup.number().required(),
  third: yup.number().required(),
  fourth: yup.number(),
  defenseDate: yup.date().min(new Date()).required(),
});

const useStyles = makeStyles({
  content: {
    width: '400px',
  },
});

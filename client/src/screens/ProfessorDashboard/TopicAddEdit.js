import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import topicsApi from '../../api/topics';
import { queryClient } from '../../index';

const TopicAddEdit = ({ topicToAddEdit, handleClose }) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const isEdit = !!topicToAddEdit?.id;

  useEffect(() => {
    if (!topicToAddEdit) return reset();
    Object.keys(schema.fields).forEach(field => {
      setValue(field, topicToAddEdit[field] || '');
    });
    setValue('subject', topicToAddEdit?.subjectId);
  }, [topicToAddEdit, reset, setValue]);

  const onSubmit = async formData => {
    const saveOperation = isEdit ? topicsApi.update : topicsApi.create;
    await saveOperation({ ...topicToAddEdit, ...formData });
    queryClient.invalidateQueries('professorSubjects');
    handleClose();
  };

  return (
    <Dialog open={!!topicToAddEdit} onClose={handleClose}>
      <DialogTitle>
        {isEdit ? 'Uredi' : 'Dodaj'} temu za kolegij {topicToAddEdit?.subjectName}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.content}>
          <TextInput name="title" errors={errors} control={control} fullWidth label="Naslov" />
          <TextInput name="description" errors={errors} control={control} multiline rows={3} fullWidth label="Opis" />
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

export default TopicAddEdit;

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  subject: yup.number().required(),
});

const useStyles = makeStyles({
  content: {
    width: '300px',
  },
});

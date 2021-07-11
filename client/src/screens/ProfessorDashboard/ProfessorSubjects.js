import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Box,
  Divider,
  Button,
  IconButton,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import usersApi from '../../api/users';
import subjectsApi from '../../api/subjects';
import TopicAddEdit from './TopicAddEdit';

const ProfessorSubjects = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);
  const [topicToAddEdit, setTopicToAddEdit] = useState(null);
  const { data: userData } = useQuery('me', usersApi.me);
  const { data: subjectsData } = useQuery('professorSubjects', () => subjectsApi.getByProfessorId(userData.id), {
    enabled: !!userData,
  });

  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {subjectsData?.map(({ id, name, study, topics, level }) => (
        <Accordion key={id} expanded={expanded === `${name}-${study}`} onChange={handleChange(`${name}-${study}`)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{name}</Typography>
            <Typography className={classes.secondaryHeading}>
              {study} - {level}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            {!topics.length && <Typography variant="h5">Nema dodanih tema</Typography>}
            {topics.map(topic => (
              <Box key={topic.id}>
                <Box p={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{topic.title}</Typography>
                    <IconButton onClick={() => setTopicToAddEdit({ subjectId: id, subjectName: name, ...topic })}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {topic.description}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            ))}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setTopicToAddEdit({ subjectId: id, subjectName: name })}
              >
                Dodaj temu
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <TopicAddEdit topicToAddEdit={topicToAddEdit} handleClose={() => setTopicToAddEdit(null)} />
    </>
  );
};

export default ProfessorSubjects;

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionDetails: {
    display: 'block',
  },
  chip: {
    margin: '0 10px',
  },
}));

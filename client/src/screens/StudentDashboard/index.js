import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Box,
  Divider,
  Button,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { useQuery } from 'react-query';
import usersApi from '../../api/users';
import applicationsApi from '../../api/applications';
import ConfirmDialog from '../../components/ConfirmDialog';

const StudentDashboard = () => {
  const { data } = useQuery('studentTopics', usersApi.getStudentTopics);
  const [expanded, setExpanded] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const classes = useStyles();

  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {data?.enrolledSubjects.map(({ id, name, professor, study, topics }) => (
        <Accordion key={id} expanded={expanded === `${name}-${study}`} onChange={handleChange(`${name}-${study}`)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{name}</Typography>
            <Typography className={classes.secondaryHeading}>
              {professor.firstName} {professor.lastName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            {!topics.length && <Typography variant="h5">Nema dodanih tema</Typography>}
            {topics.map(topic => (
              <Box key={topic.id}>
                <Box p={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{topic.title}</Typography>
                    <Button
                      color="primary"
                      disabled={data.hasApplied || !topic.isAvailable}
                      variant="contained"
                      size="small"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      Prijavi
                    </Button>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {topic.description}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <ConfirmDialog
        title="Prijavi temu"
        description={`Jeste li sigurni da želite prijaviti ${selectedTopic?.title}`}
        acceptText="Prijavi"
        declineText="Odustanu"
        open={!!selectedTopic}
        handleAccept={() => {
          applicationsApi.apply({ topic: selectedTopic.id, mentor: selectedTopic.professor.id });
          setSelectedTopic(null);
        }}
        handleClose={() => setSelectedTopic(null)}
      />
    </>
  );
};

export default StudentDashboard;

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '40%',
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

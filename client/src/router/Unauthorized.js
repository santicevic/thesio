import React from 'react';
import { Paper, Box, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../constants';

const Unauthorized = ({ role }) => {
  const history = useHistory();

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Box maxWidth="500px">
        <Paper elevation={2}>
          <Box p={3} display="flex" alignItems="center" flexDirection="column">
            <Typography variant="h3">Niste autorizirani</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(ROUTES[role.toLowerCase()].base.href)}
            >
              Vrati se na početnu stranicu
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Unauthorized;

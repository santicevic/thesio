import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfrimDialog = ({ title, description, acceptText, declineText, open, handleAccept, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {declineText && (
          <Button onClick={handleClose} color="secondary" variant="contained">
            {declineText}
          </Button>
        )}
        <Button onClick={handleAccept} color="primary" variant="contained" autoFocus>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfrimDialog;

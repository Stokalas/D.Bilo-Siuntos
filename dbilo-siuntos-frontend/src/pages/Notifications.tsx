import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { ClearNotification } from 'src/store/actions/notificationsActions';
import { getNotificationsState } from 'src/store/selectors/notificationsSelector';

export const Notification = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector(getNotificationsState);

  const handleClose = (reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(ClearNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      sx={{ top: '50px' }}
      onClose={handleClose}
      open={isOpen}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import { Router } from './components/router';
import { theme } from './resources';
import { onStart, refreshCookie } from './authApi';
import { Notification } from './pages/Notifications';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(onStart());
  refreshCookie();

  return (
    <ThemeProvider theme={theme}>
      <Router />
      <Notification />
    </ThemeProvider>
  );
};

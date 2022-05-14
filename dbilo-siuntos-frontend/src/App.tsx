import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';

import { persistor, store } from './store/reducers/store';
import { Router } from './components/router';
import { theme } from './resources';
import { refreshCookie } from './authApi';

export const App: React.FC = () => {
  refreshCookie();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

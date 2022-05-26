import React from 'react';
import { Container } from '@mui/material';

import { SendParcelForm } from '../components/parcel';

export const SendParcelPage = () => {
  return (
    <Container maxWidth="sm" sx={{ marginBottom: '500px' }}>
      <SendParcelForm />
    </Container>
  );
};

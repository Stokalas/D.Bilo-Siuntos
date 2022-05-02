import * as React from 'react';
import { Button, TextField } from '@mui/material';

import { geocode } from 'src/utility/mapsUtils';

export const Geocoder: React.FC = () => {
  const [address, setAddress] = React.useState('');
  const onClick = async () => {
    console.log('loading');
    const text = await geocode(address);
    console.log(text);
  };

  return (
    <div
      style={{
        padding: '1rem',
        flexBasis: '250px',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <TextField onChange={(e) => setAddress(e.target.value)}></TextField>
      <Button onClick={async (_) => onClick()}>Geocode</Button>
    </div>
  );
};

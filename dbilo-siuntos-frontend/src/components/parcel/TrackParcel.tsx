import React, { useState, ChangeEvent } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Button, Paper, TextField, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';

import { api } from 'src/api';
import { Parcel } from 'src/types';

export const TrackParcel: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleTrackingNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.currentTarget.value);
  };

  const onClick = async () => {
    setLoading(true);
    // TODO - fix endpoint once get by tracking number is available
    try {
      const response = await api.get<Array<Parcel>>(`parcel/${trackingNumber}`);
      if (response.length !== 0) {
        navigate(`/parcel/${response[0]!.id}`, { state: { parcel: response[0] } });
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Grid rowSpacing={0} columnSpacing={3} container padding={'25px'}>
          <Grid item xs={12}>
            <Typography
              display="flex"
              fontFamily="orbitron, sans-serif"
              fontSize="30px"
              sx={{ alignItems: 'center' }}
            >
              <LocalShippingIcon sx={{ fontSize: 'inherit' }}></LocalShippingIcon>
              Track Parcel
            </Typography>
          </Grid>
          <Grid item md={10} sm={9} xs={8} justifyContent="center">
            <TextField
              onChange={handleTrackingNumber}
              size="small"
              label="Tracking number"
              variant="filled"
              fullWidth
              error={error && !loading}
              helperText={error && !loading ? 'No such parcel was found' : ' '}
            ></TextField>
          </Grid>
          <Grid item md={2} sm={3} xs={4} justifyContent="center">
            <Button
              onClick={(_) => onClick()}
              sx={{ minHeight: '67%' }}
              fullWidth
              disabled={loading}
              variant="contained"
            >
              <Typography> {loading ? 'Loading' : 'Search'}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

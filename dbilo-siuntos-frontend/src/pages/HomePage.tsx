import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { alpha, Paper, Typography, useTheme } from '@mui/material';

import homepageImage from '../assets/homepage-image.jpg';
import { api } from 'src/api';
import { GoogleMap } from 'src/components/map/';
import { handleResize } from 'src/utility';
import { TrackParcel } from 'src/components/parcel';

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < theme.breakpoints.values['sm']);

  useEffect(() => {
    handleResize(theme, setIsMobile);
  }, [theme]);

  useEffect(() => {
    api.get('parcel/all', {}, true).then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box minHeight="450px" bgcolor={(theme) => alpha(theme.palette.secondary.main, 0.5)}>
            <Container maxWidth="lg">
              <Grid spacing={0} sx={{ marginTop: '10px' }} container>
                <Grid item md={6} sm={12}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '450px',
                      paddingRight: '10vw',
                    }}
                  >
                    <Typography fontFamily="orbitron, sans-serif" fontSize="56px" color="primary">
                      We Deliver For You
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={12} md={6}>
                  <Paper
                    sx={{
                      backgroundImage: `url(${homepageImage})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      minHeight: '450px',
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
        <Grid item xs={12} marginTop="-50px">
          <TrackParcel />
        </Grid>
        <Grid item xs={12}>
          {!isMobile && (
            <Grid spacing={0} container>
              <Grid item sm={12} display="flex" justifyContent="center" sx={{ margin: '25px 0px' }}>
                <Typography fontFamily="orbitron, sans-serif" fontSize="56px">
                  Parcel Terminals
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <GoogleMap minHeight="600px" />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <div style={{ minHeight: '150px' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

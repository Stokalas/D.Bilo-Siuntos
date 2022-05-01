import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { alpha, Typography } from '@mui/material';

import homepageImage from '../assets/homepage-image.jpg';
import { api } from 'src/api';
// import { GoogleMap } from 'src/components/GoogleMap';
import { App } from 'src/components/Map';

export const HomePage: React.FC = () => {
  useEffect(() => {
    api.get('parcel/all').then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false}>
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
            <Grid
              item
              sm={12}
              md={6}
              sx={{
                backgroundImage: `url(${homepageImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div
                style={{
                  minHeight: '450px',
                }}
              ></div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid spacing={0} sx={{ marginTop: '10px' }} container>
          <Grid item sm={12}>
            {/* <GoogleMap></GoogleMap> */}
            <App></App>
          </Grid>
        </Grid>
      </Container>
      <div style={{ minHeight: '150px' }} />
    </Container>
  );
};

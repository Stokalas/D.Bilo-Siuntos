import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { alpha, Typography, useTheme } from '@mui/material';

import homepageImage from '../assets/homepage-image.jpg';
import { api } from 'src/api';
import { GoogleMap } from 'src/components/map/';
import { handleResize } from 'src/utility';

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < theme.breakpoints.values['sm']);

  useEffect(() => {
    handleResize(theme, setIsMobile);
  }, [theme]);

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
      {!isMobile && (
        <Grid spacing={0} container>
          <Grid item sm={12} display="flex" justifyContent="center" sx={{ margin: '25px' }}>
            <Typography fontFamily="orbitron, sans-serif" fontSize="56px">
              Parcel Terminals
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <GoogleMap></GoogleMap>
          </Grid>
        </Grid>
      )}
      <div style={{ minHeight: '150px' }} />
    </Container>
  );
};

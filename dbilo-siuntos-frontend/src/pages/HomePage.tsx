import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { alpha, Typography } from '@mui/material';

import homepageImage from '../assets/homepage-image.jpg';

export const HomePage: React.FC = () => {
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
      <div style={{ minHeight: '150px' }} />
    </Container>
  );
};

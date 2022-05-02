import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import { Header } from './Header';
import { ROUTES } from 'src/resources/routes-constants';
import { HomePage } from 'src/pages/HomePage';
import { Footer } from './Footer';
import { TheMap } from '../Map';
import { Geocoder } from '../Geocoder';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path={ROUTES.HOMEPAGE.url} />
        <Route
          element={
            <div>
              <Container maxWidth="lg">
                <Grid spacing={0} sx={{ marginTop: '10px' }} container>
                  <Grid item sm={12}>
                    <TheMap></TheMap>
                  </Grid>
                </Grid>
              </Container>
              <h2>About</h2>
            </div>
          }
          path={ROUTES.ABOUT.url}
        />
        <Route element={<Geocoder></Geocoder>} path={ROUTES.PLACEHOLDER.url} />
        {/* <Route element={<h2>Placeholder</h2>} path={ROUTES.PLACEHOLDER.url} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

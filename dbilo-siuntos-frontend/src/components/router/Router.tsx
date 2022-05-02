import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './Header';
import { ROUTES } from 'src/resources/routes-constants';
import { HomePage } from 'src/pages/HomePage';
import { SendParcel } from 'src/pages/SendParcelPage/SendParcel';
import { Footer } from './Footer';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path={ROUTES.HOMEPAGE.url} />
        <Route element={<h2>About</h2>} path={ROUTES.ABOUT.url} />
        <Route element={<h2>Placeholder</h2>} path={ROUTES.PLACEHOLDER.url} />
        <Route element={<SendParcel />} path={ROUTES.CREATE_PARCEL.url} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './Header';
import { ROUTES } from 'src/resources/routes-constants';
import { HomePage } from 'src/pages/HomePage';
import { SendParcel } from 'src/pages/SendParcelPage/SendParcel';
import { Footer } from './Footer';
import { ParcelPage } from '../../pages/ParcelPage';
import { LoginPage } from '../../pages/LoginPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { RegisterPage } from 'src/pages/RegisterPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path={ROUTES.HOMEPAGE.url} />
        <Route element={<RegisterPage />} path={ROUTES.REGISTER.url} />
        <Route element={<LoginPage />} path={ROUTES.LOGIN.url} />
        <Route element={<LogoutPage />} path={ROUTES.LOGOUT.url} />
        <Route element={<SendParcel />} path={ROUTES.CREATE_PARCEL.url} />
        <Route element={<ParcelPage />} path={ROUTES.PARCEL_PAGE.url} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

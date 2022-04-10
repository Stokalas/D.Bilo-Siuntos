import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavBarButton } from './NavBarButton';
import { NavBar } from './NavBar';
import { ROUTES } from 'src/resources/routes-constants';
import { HomePage } from 'src/pages/HomePage';
import { Footer } from '../Footer';

export const Router = () => {
  return (
    <BrowserRouter>
      <NavBar
        leftChidren={() => (
          <>
            <NavBarButton name="Home" url={ROUTES.HOMEPAGE} />
            <NavBarButton name="About" url={ROUTES.ABOUT} />
          </>
        )}
        rightChildren={() => (
          <>
            <NavBarButton name="Placeholder" url={ROUTES.PLACEHOLDER} />
          </>
        )}
      />
      <Routes>
        <Route element={<HomePage />} path={ROUTES.HOMEPAGE} />
        <Route element={<h2>About</h2>} path={ROUTES.ABOUT} />
        <Route element={<h2>Placeholder</h2>} path={ROUTES.PLACEHOLDER} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

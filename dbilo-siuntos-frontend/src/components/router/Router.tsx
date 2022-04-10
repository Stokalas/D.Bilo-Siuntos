import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavBarButton } from './NavBarButton';
import { NavBar } from './NavBar';
import { ROUTES } from 'src/resources/routes-constants';
import { HomePage } from 'src/pages/HomePage';
import { Footer } from '../Footer';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

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
            <NavBarButton name="Dashboard" url={ROUTES.DASHBOARD} />
          </>
        )}
      />
      <Routes>
        <Route element={<HomePage />} path={ROUTES.HOMEPAGE} />
        <Route element={<About />} path={ROUTES.ABOUT} />
        <Route element={<Dashboard />} path={ROUTES.DASHBOARD} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

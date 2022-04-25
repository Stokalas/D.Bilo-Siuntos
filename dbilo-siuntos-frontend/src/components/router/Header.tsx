import React, { useEffect, useState } from 'react';
import {
  Toolbar,
  AppBar,
  Box,
  ThemeProvider,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import _ from 'lodash';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

import { headerTheme, ROUTES } from 'src/resources';
import logo from '../../assets/rocket.jpg';
import { Hamburger } from './Hamburger';
import { NavBarButton } from './NavBarButton';

export const Header: React.FC = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < theme.breakpoints.values['sm']);

  useEffect(() => {
    const handleResize = _.debounce(
      () => setIsMobile(window.innerWidth < theme.breakpoints.values['sm']),
      100
    );
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  const leftRoutes = [
    { ...ROUTES.HOMEPAGE, renderIcon: () => <HomeIcon /> },
    { ...ROUTES.ABOUT, renderIcon: () => <InfoIcon /> },
  ];
  const rightRoutes = [{ ...ROUTES.PLACEHOLDER, renderIcon: () => <QuestionMarkIcon /> }];

  return (
    <ThemeProvider theme={headerTheme}>
      <AppBar position="static">
        <Container disableGutters maxWidth="lg">
          <Toolbar variant="dense">
            <Typography fontSize="26px" paddingRight="5px" color="secondary">
              Dede Bilas
            </Typography>
            <img src={logo} alt="Dede Bilas Logo" height="40px" style={{ paddingRight: '2vw' }} />
            {!isMobile && (
              <>
                <Box display="flex" alignItems="center" marginRight="auto">
                  {leftRoutes.map((route) => (
                    <NavBarButton key={route.name} name={route.name} url={route.url} />
                  ))}
                </Box>
                <Box display="flex" marginLeft="auto">
                  {rightRoutes.map((route) => (
                    <NavBarButton key={route.name} name={route.name} url={route.url} />
                  ))}
                </Box>
              </>
            )}
            {isMobile && (
              <Box display="flex" marginLeft="auto">
                <Hamburger routes={[...leftRoutes, ...rightRoutes]} />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

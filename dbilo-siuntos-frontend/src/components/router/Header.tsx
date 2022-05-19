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
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useSelector } from 'react-redux';

import { headerTheme, ROUTES } from 'src/resources';
import logo from '../../assets/rocket.jpg';
import { Hamburger } from './Hamburger';
import { NavBarButton } from './NavBarButton';
import { handleResize } from 'src/utility';
import { getLoginState } from 'src/store/selectors/loginSelectors';

const LOGOUT_ROUTES = [{ ...ROUTES.LOGOUT, renderIcon: () => <LogoutIcon /> }];
const UNLOGGED_ROUTES = [
  { ...ROUTES.LOGIN, renderIcon: () => <LoginIcon /> },
  { ...ROUTES.REGISTER, renderIcon: () => <VpnKeyIcon /> },
];

export const Header: React.FC = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < theme.breakpoints.values['sm']);
  const [rightRoutes, setRightRoutes] = useState(UNLOGGED_ROUTES);
  const isLogged = useSelector(getLoginState)?.isLogged;

  useEffect(() => {
    handleResize(theme, setIsMobile);
  }, [theme]);

  useEffect(() => {
    setRightRoutes(isLogged ? LOGOUT_ROUTES : UNLOGGED_ROUTES);
  }, [isLogged]);

  const leftRoutes = [
    { ...ROUTES.HOMEPAGE, renderIcon: () => <HomeIcon /> },
    { ...ROUTES.CREATE_PARCEL, renderIcon: () => <SendIcon /> },
  ];

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

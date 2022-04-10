import { Toolbar, AppBar, Box, ThemeProvider, Container, Typography } from '@mui/material';

import { headerTheme } from 'src/resources';
import logo from '../../assets/rocket.jpg';

type NavBarProps = {
  leftChidren: () => JSX.Element;
  rightChildren: () => JSX.Element;
};

export const NavBar: React.FC<NavBarProps> = ({ leftChidren, rightChildren }) => {
  return (
    <ThemeProvider theme={headerTheme}>
      <AppBar position="static">
        <Container disableGutters maxWidth="lg">
          <Toolbar variant="dense">
            <Box display="flex" alignItems="center" marginRight="auto">
              <Typography fontSize="26px" paddingRight="5px" color="secondary">
                Dede Bilas
              </Typography>
              <img src={logo} alt="Dede Bilas Logo" height="40px" style={{ paddingRight: '2vw' }} />
              {leftChidren()}
            </Box>
            <Box display="flex" marginLeft="auto">
              {rightChildren()}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

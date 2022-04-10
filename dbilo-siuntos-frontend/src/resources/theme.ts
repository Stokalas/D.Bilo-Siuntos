import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#3d3471',
      main: '#3f50b5',
      dark: '#0d0f45',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffec',
      main: '#e6e0bb',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export const headerTheme = createTheme({
  ...theme,
  typography: {
    fontFamily: ['orbitron', 'sans-serif'].join(','),
  },
});

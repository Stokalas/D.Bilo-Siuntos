import { Box, Container, Typography, ThemeProvider } from '@mui/material';

import { headerTheme } from 'src/resources';

export const Footer = () => {
  return (
    <ThemeProvider theme={headerTheme}>
      <footer>
        <Box py={{ xs: 3 }} bgcolor="primary.dark">
          <Container maxWidth="lg">
            <Box textAlign="center">
              <Typography color="secondary">
                Dede Bilas Siuntos &reg; {new Date().getFullYear()}
              </Typography>
            </Box>
          </Container>
        </Box>
      </footer>
    </ThemeProvider>
  );
};

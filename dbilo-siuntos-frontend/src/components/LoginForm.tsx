import React, { useState } from 'react';
import {
  TextField,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login } from 'src/authApi';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const InitialFormData: LoginFormData = {
  email: '',
  password: '',
  remember: false,
};

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>(InitialFormData);

  // I can do form validation later - have a custom made component from back in the day
  //   const [isUsernameValid, setIsUsernameValid] = useState(false);
  //   const [isPasswordValid, setIsPasswordValid] = useState(false);
  //   const isFormValid = isUsernameValid && isPasswordValid;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, remember } = formData;
    dispatch(login({ email, password, remember }, navigate));
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const onRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, remember: e.target.checked });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: '100%', marginTop: '24px' }} noValidate onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                autoFocus
                error={false}
                fullWidth
                id="email"
                label="Email"
                onChange={onUsernameChange}
                value={formData.email}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                error={false}
                fullWidth
                id="password"
                label="Password"
                onChange={onPasswordChange}
                type="password"
                value={formData.password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="primary" name="remember-user" onChange={onRememberChange} />
                }
                label={<Typography fontSize="0.8rem">Remember me</Typography>}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: '50px' }}>
            <Grid item xs={6}>
              <Button fullWidth color="primary" type="submit" variant="contained">
                Sign in
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth color="primary" component={Link} to="/register" variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

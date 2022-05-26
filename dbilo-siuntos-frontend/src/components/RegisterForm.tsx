import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Link, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register } from 'src/authApi';

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

//Add validation
//Add notifications on succesful login
//Redirect when trying to register when already logged in

const InitialFormData: RegisterFormData = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>(InitialFormData);

  const dispatch = useDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(formData, navigate));
  };

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof RegisterFormData) => {
    formData[field] = e.target.value;
    setFormData({ ...formData });
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
          Register
        </Typography>
        <form style={{ width: '100%', marginTop: '24px' }} noValidate onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                autoFocus
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, 'email')}
                value={formData.email}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete="firstname"
                fullWidth
                id="firstname"
                label="First name"
                name="firstname"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, 'firstName')}
                value={formData.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete="lastname"
                fullWidth
                id="lastname"
                label="Last name"
                name="lastname"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, 'lastName')}
                value={formData.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                fullWidth
                id="password"
                label="Password"
                name="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e, 'password')}
                type="password"
                value={formData.password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                fullWidth
                id="confirmPassword"
                label="Confirm password"
                name="confirmPassword"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onFieldChange(e, 'confirmPassword')
                }
                type="password"
                value={formData.confirmPassword}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            sx={{ margin: '20px 0px' }}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>
          <Grid container sx={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login!
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

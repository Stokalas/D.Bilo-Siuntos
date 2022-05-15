import React, { useState } from 'react';
import { TextField, Checkbox, Button, Box, FormControlLabel, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login } from 'src/authApi';

const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const GetRole = () => {
  //TO DO
  return Roles.ADMIN;
};

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
    dispatch(login({ email, password, role: GetRole(), remember }, navigate));
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

  //Form from an old project, don't pay much attention now
  return (
    <form onSubmit={onFormSubmit}>
      <Box>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
      </Box>
      <Box>
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
      </Box>
      <Box>
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
      </Box>
      <Box>
        <FormControlLabel
          control={<Checkbox color="primary" name="remember-user" onChange={onRememberChange} />}
          label={<Typography>Remember me</Typography>}
        />
      </Box>
      <Box>
        <Button color="primary" type="submit" variant="contained">
          Sign in
        </Button>
        <Button color="primary" component={Link} to="/register" variant="contained">
          Register
        </Button>
      </Box>
    </form>
  );
};

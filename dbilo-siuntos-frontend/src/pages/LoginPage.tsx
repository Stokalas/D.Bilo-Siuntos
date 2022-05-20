import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoginForm } from 'src/components/LoginForm';
import { getLoginState } from 'src/store/selectors/loginSelectors';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const isLogged = useSelector(getLoginState)?.isLogged;

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);

  return <LoginForm />;
};

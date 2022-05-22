import { NavigateFunction } from 'react-router-dom';

import { api } from './api';
import {
  setLoginState,
  logoutAction,
  loginDetailsType,
  registerDetailsType,
} from './store/actions/loginActions';
import { SetNotificationAction } from './store/actions/notificationsActions';

export const register = (data: registerDetailsType, navigate: NavigateFunction) => {
  return (dispatch: any) => {
    api
      .post('auth/register', data)
      .then((response: any) => {
        dispatch(SetNotificationAction({ isOpen: true, message: response.data, type: 'success' }));
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          SetNotificationAction({ isOpen: true, message: error.response.data, type: 'error' })
        );
      });
  };
};

export const login = (details: loginDetailsType, navigate: NavigateFunction) => {
  return (dispatch: any) => {
    return api
      .post('auth/login', details, true)
      .then((response: any) => {
        dispatch(setLoginState({ ...response.data, email: details.email }));
        dispatch(
          SetNotificationAction({
            isOpen: true,
            message: 'Logged in successfully',
            type: 'success',
          })
        );
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          SetNotificationAction({ isOpen: true, message: error.response.data, type: 'error' })
        );
      });
  };
};

export const logout = (navigate: NavigateFunction) => {
  return (dispatch: any) => {
    return api.post('auth/logout', {}, true).then(() => {
      dispatch(logoutAction());
      dispatch(
        SetNotificationAction({ isOpen: true, message: 'Logged out successfully', type: 'success' })
      );
      navigate('/');
    });
  };
};

export const onStart = () => {
  return (dispatch: any) => {
    cookieRequest().then((data) => {
      if (data !== 'noCookie') {
        dispatch(setLoginState({ ...data }));
      } else {
        dispatch(logoutAction());
      }
    });
  };
};

export const cookieRequest = () => {
  return api.post('auth/newcookie', {}, true).then((response: any) => response);
};

export const refreshCookie = () => {
  setInterval(cookieRequest, 840000);
};

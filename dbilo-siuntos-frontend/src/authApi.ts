import { NavigateFunction } from 'react-router-dom';

import { api } from './api';
import {
  setLoginState,
  logoutAction,
  loginDetailsType,
  registerDetailsType,
} from './store/actions/loginActions';
// import { SetNotificationAction } from '../state/actions/notificationsActions';

export const register = (data: registerDetailsType, navigate: NavigateFunction) => {
  return () => {
    api
      .post('auth/register', data)
      .then((response) => {
        console.log(response);
        // dispatch(SetNotificationAction({ isOpen: true, message: response.data, type: 'success' }));
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        // dispatch(
        //   SetNotificationAction({ isOpen: true, message: error.response.data, type: 'error' })
        // );
      });
  };
};

export const login = (details: loginDetailsType, navigate: NavigateFunction) => {
  return (dispatch: any) => {
    return api
      .post('auth/login', details, true)
      .then((response: any) => {
        console.log(response);
        dispatch(setLoginState({ ...response.data, email: details.email }));

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        // dispatch(
        //   SetNotificationAction({ isOpen: true, message: error.response.data, type: 'error' })
        // );
      });
  };
};

export const logout = (navigate: NavigateFunction) => {
  return (dispatch: any) => {
    return api.post('auth/logout', {}, true).then(() => {
      dispatch(logoutAction());
      navigate('/');
    });
  };
};

// export const onStart = () => {
//   return (dispatch) => {
//     cookieRequest().then((data) => {
//       if (data !== 'noCookie') {
//         dispatch(setLoginState({ ...data }));
//       } else {
//         dispatch(logoutAction);
//       }
//     });
//   };
// };

export const cookieRequest = () => {
  return api.post('auth/newcookie', {}, true).then((response: any) => response.data);
};

export const refreshCookie = () => {
  setInterval(cookieRequest, 840000);
};

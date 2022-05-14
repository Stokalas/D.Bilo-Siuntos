// import { history } from '../components/Routes/PageRouter';
import { NavigateFunction } from 'react-router-dom';

import { api } from './api';
import { setLoginState, logoutAction } from './store/actions/loginActions';
// import { RegisterFormData } from '../components/RegisterForm/RegisterForm';
// import { setLoginState, loginDetailsType, logoutAction } from '../state/actions/loginActions';
// import { SetNotificationAction } from '../state/actions/notificationsActions';

export const register = (data: any) => {
  return () => {
    api
      .post('auth/register', data)
      .then((response) => {
        // history.push('/login');
        console.log(response);
        // dispatch(SetNotificationAction({ isOpen: true, message: response.data, type: 'success' }));
      })
      .catch((error) => {
        console.log(error);
        // dispatch(
        //   SetNotificationAction({ isOpen: true, message: error.response.data, type: 'error' })
        // );
      });
  };
};

// export const login = (details: loginDetailsType) => {
export const login = (details: any, navigate: NavigateFunction) => {
  return (dispatch: any) => {
    return api
      .post('auth/login', details, true)
      .then((response: any) => {
        console.log(response);
        dispatch(setLoginState({ ...response.data, email: details.email }));

        // const navigate = useNavigate();
        navigate('/');
        // history.push('/');
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

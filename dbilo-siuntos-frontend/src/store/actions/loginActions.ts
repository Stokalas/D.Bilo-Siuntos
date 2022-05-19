import * as actionTypes from './actionTypes';

export type loginDetailsType = {
  email: string;
  password: string;
  remember: boolean;
};

export type registerDetailsType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

interface stateDetailsType {
  email: string;
  id: number;
  role: string;
}

export const setLoginState = (details: stateDetailsType) => ({
  type: actionTypes.LOGIN,
  payload: details,
});

export const logoutAction = () => ({
  type: actionTypes.LOGOUT,
});

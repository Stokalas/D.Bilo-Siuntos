import * as actionTypes from '../actions/actionTypes';

export interface LoginState {
  isLogged: boolean;
  user: {
    email: string;
    id: number;
    role: string;
  };
}

type LoginAction = {
  type: string;
  payload: {
    email: string;
    id: number;
    role: string;
    remember: boolean;
  };
};

const initialState: LoginState = {
  isLogged: false,
  user: {
    email: '',
    id: -1,
    role: 'USER',
  },
};

export const loginReducer = (state: LoginState = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: {
          email: action.payload.email,
          id: action.payload.id,
          role: action.payload.role,
        },
        isLogged: true,
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

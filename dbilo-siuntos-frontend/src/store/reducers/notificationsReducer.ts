import * as actionTypes from '../actions/actionTypes';

export type NotificationsState = {
  isOpen: boolean;
  message: string;
  type: 'warning' | 'success' | 'error' | 'info';
};

const initialState: NotificationsState = {
  isOpen: false,
  message: '',
  type: 'warning',
};

type NotificationAction = {
  type: string;
  payload: NotificationsState;
};

export const notificationsReducer = (
  state: NotificationsState = initialState,
  action: NotificationAction
): NotificationsState => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION: {
      return { ...state, isOpen: true, message: action.payload.message, type: action.payload.type };
    }
    case actionTypes.CLEAR_NOTIFICATION: {
      return { ...state, isOpen: false };
    }
    default:
      return state;
  }
};

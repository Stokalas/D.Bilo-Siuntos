import * as actionTypes from './actionTypes';
import { NotificationsState } from '../reducers/notificationsReducer';

export const SetNotificationAction = (props: NotificationsState) => ({
  type: actionTypes.SET_NOTIFICATION,
  payload: props,
});

export const ClearNotification = () => ({
  type: actionTypes.CLEAR_NOTIFICATION,
});

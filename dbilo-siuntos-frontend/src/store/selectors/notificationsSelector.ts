import { NotificationsState } from '../reducers/notificationsReducer';
import { RootState } from '../reducers/store';

export const getNotificationsState = (state: RootState): NotificationsState => state.notifications;

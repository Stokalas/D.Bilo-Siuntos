import { LoginState } from '../reducers/loginReducer';
import { RootState } from '../reducers/store';

export const getLoginState = (state: RootState): LoginState => state.login;

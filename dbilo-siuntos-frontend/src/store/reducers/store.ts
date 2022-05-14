import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import thunk from 'redux-thunk';
import type { StateType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistReducer from 'redux-persist/es/persistReducer';

import { data } from './data';
import { login } from './loginReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['data'], // elements that will be persisted
  blacklist: [], // elements that will not be persisted
};

const rootReducer = combineReducers({ data, login });

const middlewareEnhancer = applyMiddleware(thunk);

const composedEnhancers = composeWithDevTools(middlewareEnhancer);

// export const store = createStore(rootReducer, composedEnhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);
export type RootState = StateType<typeof rootReducer>;

import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'

import { user } from './user'
import { navReducer } from './nav'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
};

export const appReducer = persistCombineReducers(persistConfig, {
    nav: navReducer,
    user: user
});
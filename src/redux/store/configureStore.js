import { createStore, applyMiddleware, compose} from 'redux';
import { persistStore } from 'redux-persist';

import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

import { appReducer } from '../reducers';

export const configureStore = (initialState)=>{
    let store = createStore(
        appReducer,
        initialState,
        compose(
            // applyMiddleware(thunk, createLogger)
            applyMiddleware(thunk)
        )
    );
    let persistor = persistStore(store);

    return { persistor, store }
};
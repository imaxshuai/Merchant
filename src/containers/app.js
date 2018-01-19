import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'

import { configureStore } from '../redux/store/configureStore';
import AppWithNavigationState from '../router';
import "../utils/global";

const { store, persistor } = configureStore();

export class App extends Component{

    render(){
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppWithNavigationState />
                </PersistGate>
            </Provider>
        )
    }
}
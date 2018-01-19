import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import UserLogin from '../containers/user/login';
import UserCreate from '../containers/user/create';
import Menu from '../containers/menu';
import Setting from '../containers/menu/setting';
import Consume from '../containers/menu/consume';
import ConsumePay from '../containers/menu/consume/pay';

export const AppNavigator = StackNavigator({
    Menu: { screen: Menu },
    Setting: {screen: Setting},
    Consume: {screen: Consume},
    UserLogin: { screen: UserLogin },
    UserCreate: {screen: UserCreate},
    ConsumePay: {screen: ConsumePay},
});


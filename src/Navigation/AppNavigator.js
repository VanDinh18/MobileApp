import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

const AppNavigator = createSwitchNavigator({
    SplashScreen: {screen: SplashScreen},
    LoginScreen: {screen: LoginScreen},
    RegisterScreen: {screen: RegisterScreen},
});

export default createAppContainer(AppNavigator);
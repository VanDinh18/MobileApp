import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';
import AppNavigator from '../Navigation/AppNavigator';

const InitialNavigator = createSwitchNavigator({
    SplashScreen: {screen: SplashScreen},
    AppNavigator: {screen: AppNavigator},
});

export default createAppContainer(InitialNavigator);
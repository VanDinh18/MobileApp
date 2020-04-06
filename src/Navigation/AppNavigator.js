import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import TabNavigator from './TabNavigator';


const AppNavigator = createSwitchNavigator(
    {
        SplashScreen: { screen: SplashScreen },
        LoginScreen: { screen: LoginScreen },
        RegisterScreen: { screen: RegisterScreen },
        HomeScreen: { screen: HomeScreen },
        Main: TabNavigator,
    },
    {
        initialRouteName: 'SplashScreen',
    }
    
);

export default createAppContainer(AppNavigator);
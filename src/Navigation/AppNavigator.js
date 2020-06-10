import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import AddFriendToGroupScreen from '../screens/GroupScreen/AddFriendToGroupScreen';
import ChatScreen from '../screens/MessageScreen/ChatScreen';
import ChatSettingScreen from '../screens/MessageScreen/ChatSettingScreen';
import TabNavigator from './TabNavigator';
import MultiChatScreen from '../screens/GroupScreen/MultiChatScreen';
import MultiChatSettingScreen from '../screens/GroupScreen/MultiChatSettingScreen';
import AddFriendToGroupExistScreen from '../screens/GroupScreen/AddFriendToGroupExistScreen';
import Video from '../screens/CallScreen/Video';
import AwaitScreen from '../screens/CallScreen/AwaitScreen';

import ForgotPasswordScreen from '../screens/FogotPasswordScreen/ForgotPasswordScreen';
import ChangePassword from '../screens/SettingsScreen/ChangePassword';

const AppNavigator = createSwitchNavigator(
    {
        SplashScreen: { screen: SplashScreen },
        LoginScreen: { screen: LoginScreen },
        RegisterScreen: { screen: RegisterScreen },
        ForgotPasswordScreen: { screen: ForgotPasswordScreen },
        Main: TabNavigator,

        ChatScreen: { screen: ChatScreen },
        ChatSettingScreen: { screen: ChatSettingScreen },
        AddFriendToGroupScreen: { screen: AddFriendToGroupScreen },
        MultiChatScreen: { screen: MultiChatScreen },
        MultiChatSettingScreen: { screen: MultiChatSettingScreen },
        AddFriendToGroupExistScreen: { screen: AddFriendToGroupExistScreen },
        ChangePassword: { screen: ChangePassword },

        Video: { screen: Video },
        AwaitScreen: { screen: AwaitScreen },
    },
    {
        initialRouteName: 'SplashScreen',
    }

);

export default createAppContainer(AppNavigator);
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
import Home from '../screens/CallScreen/Home';
import Video from '../screens/CallScreen/Video';

const AppNavigator = createSwitchNavigator(
    {
        SplashScreen: { screen: SplashScreen },
        LoginScreen: { screen: LoginScreen },
        RegisterScreen: { screen: RegisterScreen },

        Main: TabNavigator,

        ChatScreen: { screen: ChatScreen },
        ChatSettingScreen: { screen: ChatSettingScreen },
        AddFriendToGroupScreen: { screen: AddFriendToGroupScreen },
        MultiChatScreen: { screen: MultiChatScreen },
        MultiChatSettingScreen: { screen: MultiChatSettingScreen },
        AddFriendToGroupExistScreen: { screen: AddFriendToGroupExistScreen },

        Home: { screen: Home },
        Video: { screen: Video },
    },
    {
        initialRouteName: 'SplashScreen',
    }

);

export default createAppContainer(AppNavigator);
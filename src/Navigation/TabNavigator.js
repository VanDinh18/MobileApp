import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SvgUri from 'react-native-svg-uri';

import MessageScreen from '../screens/MessageScreen/MessageScreen';
import GroupScreen from '../screens/GroupScreen/GroupScreen';
import CallScreen from '../screens/CallScreen/CallScreen';


const TabNavigator = createBottomTabNavigator(
    {
        MessageScreen: {
            screen: MessageScreen,
            navigationOptions: {
                tabBarLabel: 'com5',
                // tabBarIcon: ({ focused, tintColor }) => (
                //     focused
                //         ?
                //         <SvgUri
                //             width='40'
                //             height='40'
                //             source={require('../assets/images/chat.png')}
                //         />
                //         :
                //         <SvgUri
                //             width='40'
                //             height='40'
                //             source={require('../assets/images/chat.png')}
                //         />
                // ),
            },

        },
        GroupScreen: {
            screen: GroupScreen,
            navigationOptions: {
                tabBarLabel: 'com6',
            },
        },
        CallScreen: {
            screen: CallScreen,
            navigationOptions: {
                tabBarLabel: 'com6',
            },
        },
    },
);

export default TabNavigator;
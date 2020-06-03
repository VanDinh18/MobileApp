import React from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MessageScreen from '../screens/MessageScreen/MessageScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import GroupScreen from '../screens/GroupScreen/GroupScreen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const activeTintColor = '#5a94f2';
const inactiveTintColor = '#262626';

const TabNavigator = createBottomTabNavigator(
    {
        MessageScreen: {
            screen: MessageScreen,
            navigationOptions: {
                title: 'Chats',
                tabBarLabel: ({ focused, tintColor }) => (
                    focused
                        ?
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: activeTintColor, fontSize: 12, fontWeight: 'bold' }}>Chat</Text>
                        </View>)
                        :
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: inactiveTintColor, fontSize: 12 }}>Chat</Text>
                        </View>)
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    focused
                        ?
                        <Image
                            style={{ height: DEVICE_WIDTH / 15, width: DEVICE_WIDTH / 15, tintColor: activeTintColor }}
                            source={require('../assets/images/chat.png')}
                        />
                        :
                        <Image
                            style={{ height: DEVICE_WIDTH / 15, width: DEVICE_WIDTH / 15, tintColor: inactiveTintColor }}
                            source={require('../assets/images/chat.png')}
                        />
                ),
            },

        },

        GroupScreen: {
            screen: GroupScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    focused
                        ?
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: activeTintColor, fontSize: 12, fontWeight: 'bold' }}>Group</Text>
                        </View>)
                        :
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: inactiveTintColor, fontSize: 12 }}>Group</Text>
                        </View>)
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    focused
                        ?
                        <Image
                            style={{ height: DEVICE_WIDTH / 15, width: DEVICE_WIDTH / 15, tintColor: activeTintColor }}
                            source={require('../assets/images/group.png')}
                        />
                        :
                        <Image
                            style={{ height: DEVICE_WIDTH / 15, width: DEVICE_WIDTH / 15, tintColor: inactiveTintColor }}
                            source={require('../assets/images/group.png')}
                        />
                ),
            },

        },

        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    focused
                        ?
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: activeTintColor, fontSize: 12, fontWeight: 'bold' }}>Settings</Text>
                        </View>)
                        :
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: inactiveTintColor, fontSize: 12 }}>Settings</Text>
                        </View>)
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    focused
                        ?
                        <Image
                            style={{ height: DEVICE_WIDTH / 15, width: DEVICE_WIDTH / 15, tintColor: activeTintColor }}
                            source={require('../assets/images/settings.png')}
                        />
                        :
                        <Image
                            style={{ height: DEVICE_WIDTH / 15, width: DEVICE_WIDTH / 15, tintColor: inactiveTintColor }}
                            source={require('../assets/images/settings.png')}
                        />
                ),
            },
        },
    },
    {
        tabBarOptions: {
            style: { height: DEVICE_HEIGHT / 12.5, paddingTop: DEVICE_HEIGHT/80, paddingBottom: DEVICE_WIDTH / 120, margin: 0 },
        },
    },
);

export default TabNavigator;
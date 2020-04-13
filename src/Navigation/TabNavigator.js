import React from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MessageScreen from '../screens/MessageScreen/MessageScreen';
import GroupScreen from '../screens/GroupScreen/GroupScreen';
import CallScreen from '../screens/CallScreen/CallScreen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const activeTintColor = '#bfbfbf';
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
                            style={{ height: 30, width: 30, tintColor: activeTintColor }}
                            source={require('../assets/images/chat.png')}
                        />
                        :
                        <Image
                            style={{ height: 30, width: 30, tintColor: inactiveTintColor }}
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
                            style={{ height: 30, width: 30, tintColor: activeTintColor }}
                            source={require('../assets/images/group.png')}
                        />
                        :
                        <Image
                            style={{ height: 30, width: 30, tintColor: inactiveTintColor }}
                            source={require('../assets/images/group.png')}
                        />
                ),
            },
        },
        CallScreen: {
            screen: CallScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    focused
                        ?
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: activeTintColor, fontSize: 12, fontWeight: 'bold' }}>Call</Text>
                        </View>)
                        :
                        (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: inactiveTintColor, fontSize: 12 }}>Call</Text>
                        </View>)
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    focused
                        ?
                        <Image
                            style={{ height: 30, width: 30, tintColor: activeTintColor }}
                            source={require('../assets/images/call.png')}
                        />
                        :
                        <Image
                            style={{ height: 30, width: 30, tintColor: inactiveTintColor }}
                            source={require('../assets/images/call.png')}
                        />
                ),
            },
        },
    },
    {
        tabBarOptions: {
            style: { height: DEVICE_HEIGHT / 12.5, paddingTop: 10, paddingBottom: 5, margin: 0 },
        },
    },
);

export default TabNavigator;
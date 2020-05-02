import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import avatarImg from '../assets/images/avatar.jpg';


class ItemFlatListGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.gotoMultiChatScreen = this.gotoMultiChatScreen.bind(this);
    }

    gotoMultiChatScreen(navigation, chatkey, members, groupname, content) {
        navigation.navigate(
            'MultiChatScreen',
            {
                chatkey: chatkey,
                members: members,
                groupname: groupname,
                content: content
            }
        );
    }
    render() {
        const { chatkey, members, groupname, navigation, content } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.gotoMultiChatScreen(navigation, chatkey, members, groupname, content)}
                >
                    <View style={styles.avatar}>
                        <Image
                            style={{ height: 50, width: 50, borderRadius: 50 }}
                            source={avatarImg}
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={{ flex: 1, textAlignVertical: 'bottom', fontSize: 18, fontWeight: "900" }}>
                            {groupname}
                        </Text>
                        <Text style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}>
                            Last Message
                        </Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={{ fontSize: 14, color: '#b3b3b3' }}>11:12</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: DEVICE_HEIGHT / 10,
    },
    avatar: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 3.8,
        borderBottomWidth: 1,
        borderBottomColor: '#b3b3b3',
    },
    time: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#b3b3b3',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ItemFlatListGroup;
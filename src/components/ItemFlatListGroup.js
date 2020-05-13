import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';

class ItemFlatListGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.gotoMultiChatScreen = this.gotoMultiChatScreen.bind(this);
        this.renderLastMessage = this.renderLastMessage.bind(this);
        this.renderTime = this.renderTime.bind(this);
    }
    gotoMultiChatScreen(navigation, chatkey, members, groupname, groupavatar, content) {
        navigation.navigate(
            'MultiChatScreen',
            {
                chatkey: chatkey,
                members: members,
                groupname: groupname,
                groupavatar: groupavatar,
                content: content
            }
        );
    }
    renderLastMessage(content) {
        var a = Object.values(content).sort(function (a, b) {
            return a.time - b.time;
        });
        var n = a.length;
        return (
            <Text style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}>
                {a[n - 1].message}
            </Text>
        )
    }
    renderTime(content) {
        var a = Object.values(content).sort(function (a, b) {
            return a.time - b.time;
        });
        var n = a.length;
        var today = new Date();
        var date = new Date(a[n - 1].time);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).substr(-2);
        var day = ("0" + date.getDate()).substr(-2);
        var hour = ("0" + date.getHours()).substr(-2);
        var minutes = ("0" + date.getMinutes()).substr(-2);
        var result = '';
        if (today.getDay() !== date.getDay()) {
            result = day + " thg " + month;
        }
        else
            result = hour + ":" + minutes;
        return (
            <Text style={{ fontSize: 14, color: '#b3b3b3' }}>{result}</Text>
        )
    }
    render() {
        const { chatkey, members, groupname, groupavatar, navigation, content } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.gotoMultiChatScreen(navigation, chatkey, members, groupname, groupavatar, content)}>
                    <View style={styles.avatar}>
                        <Image
                            style={{ height: 50, width: 50, borderRadius: 50 }}
                            source={groupavatar ? { uri: groupavatar } : null} />
                    </View>
                    <View style={styles.title}>
                        <Text style={{ flex: 1, textAlignVertical: 'bottom', fontSize: 18, fontWeight: "900" }}>
                            {groupname}
                        </Text>
                        {this.renderLastMessage(content)}
                    </View>
                    <View style={styles.time}>
                        {this.renderTime(content)}
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
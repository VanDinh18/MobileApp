import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import User from '../components/User';

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
        if (typeof content !== 'undefined') {
            var a = Object.values(content);
            var n = a.length;
            if (a[n - 1].checkimage == 1 && User.username != a[n - 1].from) {
                return (
                    <Text
                        style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}
                        numberOfLines={1}>
                        {a[n - 1].from} đã gửi 1 ảnh đến nhóm
                    </Text>
                )
            }
            else if (a[n - 1].checkimage == 1 && User.username == a[n - 1].from) {
                return (
                    <Text
                        style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}
                        numberOfLines={1}>
                        Bạn đã gửi 1 ảnh đến nhóm
                    </Text>
                )
            }
            else {
                return (
                    <Text
                        style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}
                        numberOfLines={1}>
                        {a[n - 1].message}
                    </Text>
                )
            }
        }
        else
            return (
                <Text style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}>
                    Bạn có thể bắt đầu trò chuyện !
                </Text>
            )
    }
    renderTime(content, creationtime) {
        if (typeof content !== 'undefined') {
            // var a = Object.values(content).sort(function (a, b) {
            //     return a.time - b.time;
            // });
            var a = Object.values(content);
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
        else {
            var today = new Date();
            var date = new Date(creationtime);
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
    }
    render() {
        const { chatkey, groupname, groupavatar, members, content, creationtime, navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.gotoMultiChatScreen(navigation, chatkey, members, groupname, groupavatar, content)}>
                    <View style={styles.avatar}>
                        <Image
                            style={{ height: DEVICE_WIDTH / 8, width: DEVICE_WIDTH / 8, borderRadius: DEVICE_WIDTH / 16 }}
                            source={groupavatar ? { uri: groupavatar } : null} />
                    </View>
                    <View style={styles.title}>
                        <Text
                            style={{ flex: 1, textAlignVertical: 'bottom', fontSize: 18, fontWeight: "900" }}
                            numberOfLines={1}>
                            {groupname}
                        </Text>
                        {this.renderLastMessage(content)}
                    </View>
                    <View style={styles.time}>
                        {this.renderTime(content, creationtime)}
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
        height: DEVICE_HEIGHT / 9,
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
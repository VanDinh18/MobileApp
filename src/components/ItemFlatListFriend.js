import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import User from '../components/User';

class ItemFlatListFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            avatarImg: '',
        };
        this.gotoMessage = this.gotoMessage.bind(this);
        this.renderLastMessage = this.renderLastMessage.bind(this);
        this.renderTime = this.renderTime.bind(this);
    }
    _isMounted = false;
    gotoMessage(navigation) {
        navigation.navigate('ChatScreen', { name: this.state.title, avatar: this.state.avatarImg });
    }
    getAvatar = () => {
        return new Promise((resolve, reject) => {
            const Root = firebase.database().ref('/users/' + this.state.title);
            Root.on('value', snapshot => {
                resolve(snapshot.val().avatar);
            })
        })
    }
    renderLastMessage(content) {
        var a = Object.values(content);
        var n = a.length;
        if (a[n - 1].checkimage == 1 && User.username != a[n - 1].from) {
            return (
                <Text
                    style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}
                    numberOfLines={1}>
                    {a[n - 1].from} đã gửi 1 ảnh đến bạn
                </Text>
            )
        }
        else if (a[n - 1].checkimage == 1 && User.username == a[n - 1].from) {
            return (
                <Text
                    style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}
                    numberOfLines={1}>
                    Bạn đã gửi 1 ảnh
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
    renderTime(content) {
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
    componentDidMount = async () => {
        this._isMounted = true;
        if (this._isMounted) {
            const data = await this.getAvatar();
            this.setState({ avatarImg: data });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { navigation, content } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.gotoMessage(navigation)}>
                    <View style={styles.avatar}>
                        <Image
                            style={{ height: DEVICE_WIDTH / 8, width: DEVICE_WIDTH / 8, borderRadius: DEVICE_WIDTH / 16 }}
                            source={this.state.avatarImg ? { uri: this.state.avatarImg } : null}
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={{ flex: 1, textAlignVertical: 'bottom', fontSize: 18, fontWeight: "900" }}>
                            {this.state.title}
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
export default ItemFlatListFriend;
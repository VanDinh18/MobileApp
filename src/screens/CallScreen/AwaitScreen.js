import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import io from 'socket.io-client';

import phone_accept from '../../assets/images/phone_accept.png';
import phone_cancle from '../../assets/images/phone_cancle.png';
import wallpaper from '../../assets/images/wallpaper.png';

class AwaitScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receiver: props.navigation.state.params.data.receiver,
            sender: props.navigation.state.params.data.sender,
            avatarReceiver: '',
            avatarSender: '',
            time: 0,
        };
        this.socket = io("https://fierce-bayou-19142.herokuapp.com/", { jsonp: false });
    }
    cancle = () => {
        var data = 'abc';
        this.socket.emit("client-send-end", data);
        this.props.navigation.navigate(
            'ChatScreen',
            {
                name: this.state.sender,
                avatar: this.state.avatarSender,
            }
        )
    }
    accept = () => {
        this.props.navigation.navigate(
            'Video',
            {
                ChannelName: this.state.receiver,
            }
        )
    }
    componentDidMount = async () => {
        var receiver = this.state.receiver;
        var sender = this.state.sender;
        const Root = firebase.database().ref('users');
        Root.child(receiver).on('value', value => {
            this.setState({
                avatarReceiver: value.val().avatar,
            })
        });
        Root.child(sender).on('value', value => {
            this.setState({
                avatarSender: value.val().avatar,
            })
        });
        this.interval = setInterval(() => {
            if (this.state.time == 10) {
                this.cancle()
            }
            this.setState({ time: this.state.time + 1 });
        }, 1000);
    }
    componentWillUnmount() {
        var receiver = this.state.receiver;
        var sender = this.state.sender;
        clearInterval(this.interval);
        firebase.database().ref('users').child(receiver).off('value');
        firebase.database().ref('users').child(sender).off('value');
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={wallpaper}
                    style={styles.wallpaper}>
                    <View style={styles.img}>
                        <Image
                            style={{ height: DEVICE_WIDTH / 4, width: DEVICE_WIDTH / 4, borderRadius: DEVICE_WIDTH / 8 }}
                            source={this.state.avatarSender ? { uri: this.state.avatarSender } : null} />
                    </View>
                    <View style={styles.username}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#e6e6e6' }}>{this.state.sender}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 18, color: '#e6e6e6' }}>Đang đổ chuông...</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={{ fontSize: 16, color: '#e6e6e6' }}>0:{this.state.time}</Text>
                    </View>
                    <View style={styles.button}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => this.cancle()}
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20 }}
                                    source={phone_cancle} />
                                <Text style={{ fontSize: 16, color: '#e6e6e6' }}>Từ chối</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => this.accept()}
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20 }}
                                    source={phone_accept} />
                                <Text style={{ fontSize: 16, color: '#e6e6e6' }}>Chấp nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

            </View>
        )
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wallpaper: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
    },
    img: {
        marginTop: DEVICE_HEIGHT / 10,
    },
    username: {
        marginTop: DEVICE_HEIGHT / 30,
    },
    text: {
        marginTop: DEVICE_HEIGHT / 30,
    },
    time: {
        marginTop: DEVICE_HEIGHT / 120,
    },
    button: {
        marginTop: DEVICE_HEIGHT / 3,
        flex: 1,
        flexDirection: 'row',
    }
})
export default AwaitScreen;
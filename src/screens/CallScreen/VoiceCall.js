import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    NativeModules,
    ScrollView,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '@react-native-firebase/app';
import io from 'socket.io-client';
import User from '../../components/User';

import wallpaper from '../../assets/images/wallpaper.png';
import mic_off from '../../assets/images/mic_off.png';
import mic from '../../assets/images/mic.png';
import phone_cancle from '../../assets/images/phone_cancle.png';

const { Agora } = NativeModules;                  //Define Agora object as a native module
const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Adaptative,
} = Agora;

class VoiceCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peerIds: [],                                //Array for storing connected peers
            uid: Math.floor(Math.random() * 100),       //Generate a UID for local user
            appid: "0fedc73812c342aead62b3e673222b01",                   //Enter the App ID generated from the Agora Website
            receiver: props.navigation.state.params.data.receiver,
            sender: props.navigation.state.params.data.sender,
            avatarReceiver: '',
            avatarSender: '',
            navigation: props.navigation,
            vidMute: false,                             //State variable for Video Mute
            audMute: false,                             //State variable for Audio Mute
            joinSucceed: false,                         //State variable for storing success
        };
        const config = {                            //Setting config of the app
            appid: this.state.appid,                  //App ID
            channelProfile: 0,                        //Set channel profile as 0 for RTC
            videoEncoderConfig: {                     //Set Video feed encoder settings
                width: 720,
                height: 1080,
                bitrate: 1,
                frameRate: FPS30,
                orientationMode: Adaptative,
            },
            audioProfile: AudioProfileDefault,
            audioScenario: AudioScenarioDefault,
        };
        RtcEngine.init(config);                     //Initialize the RTC engine
        this.socket = io("https://fierce-bayou-19142.herokuapp.com/", { jsonp: false });
    }

    componentDidMount = async () => {
        var receiver = this.state.receiver;
        var sender = this.state.sender;
        var avatarReceiver = '';
        var avatarSender = '';
        var navigation = this.state.navigation;
        const Root = firebase.database().ref('users');
        await Root.child(receiver).once('value', value => {
            avatarReceiver = value.val().avatar;
        });
        await Root.child(sender).once('value', value => {
            avatarSender = value.val().avatar;
        });
        this.setState({
            avatarReceiver: avatarReceiver,
            avatarSender: avatarSender,
        })
        this.socket.on("server-send-end", function (data) {
            console.log(data);
            RtcEngine.destroy();
            if (User.username == sender) {
                navigation.navigate(
                    'ChatScreen',
                    {
                        name: receiver,
                        avatar: avatarReceiver,
                    }
                );
            }
            else {
                navigation.navigate(
                    'ChatScreen',
                    {
                        name: sender,
                        avatar: avatarSender,
                    }
                );
            }
        });
        RtcEngine.on('userJoined', (data) => {
            const { peerIds } = this.state;             //Get currrent peer IDs
            if (peerIds.indexOf(data.uid) === -1) {     //If new user has joined
                this.setState({
                    peerIds: [...peerIds, data.uid],        //add peer ID to state array
                });
            }
        });
        RtcEngine.on('userOffline', (data) => {       //If user leaves
            this.setState({
                peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
            });
        });
        RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
            RtcEngine.startPreview();                                      //Start RTC preview
            this.setState({
                joinSucceed: true,                                           //Set state variable to true
            });
        });
        RtcEngine.joinChannel(this.state.receiver, this.state.uid);  //Join Channel
        RtcEngine.enableAudio();                                        //Enable the audio
    }
    componentWillUnmount() {

    }
    toggleAudio = () => {
        let mute = this.state.audMute;
        console.log('Audio toggle', mute);
        RtcEngine.muteLocalAudioStream(!mute);
        this.setState({
            audMute: !mute,
        });
    }
    endCall = () => {
        RtcEngine.destroy();
        var data = 'abc';
        this.socket.emit("client-send-end", data);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={wallpaper}
                    style={styles.wallpaper}>
                    <View style={styles.img}>
                        {
                            User.username == this.state.sender
                                ?
                                <Image
                                    style={{ height: DEVICE_WIDTH / 4, width: DEVICE_WIDTH / 4, borderRadius: DEVICE_WIDTH / 8 }}
                                    source={this.state.avatarReceiver ? { uri: this.state.avatarReceiver } : null} />
                                :
                                <Image
                                    style={{ height: DEVICE_WIDTH / 4, width: DEVICE_WIDTH / 4, borderRadius: DEVICE_WIDTH / 8 }}
                                    source={this.state.avatarSender ? { uri: this.state.avatarReceiver } : null} />
                        }

                    </View>
                    <View style={styles.username}>
                        {
                            User.username == this.state.sender
                                ?
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#e6e6e6' }}>{this.state.receiver}</Text>
                                :
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#e6e6e6' }}>{this.state.sender}</Text>
                        }
                    </View>
                    <View style={styles.text}>
                        {
                            this.state.peerIds.length <= 0
                                ?
                                <Text style={{ fontSize: 18, color: '#e6e6e6' }}>Đang đổ chuông...</Text>
                                :
                                <Text style={{ fontSize: 18, color: '#e6e6e6' }}>Cuộc gọi đang thực hiện...</Text>
                        }

                    </View>
                    <View style={styles.time}>
                        {/* <Text style={{ fontSize: 16, color: '#e6e6e6' }}>0:{this.state.time}</Text> */}
                    </View>
                    <View style={styles.button}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => this.toggleAudio()}
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.audMute
                                    ?
                                    <Image
                                        style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20 }}
                                        source={mic_off} />
                                    :
                                    <Image
                                        style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20 }}
                                        source={mic} />
                                }

                                <Text style={{ fontSize: 16, color: '#e6e6e6' }}>Loa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => this.endCall()}
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20 }}
                                    source={phone_cancle} />
                                <Text style={{ fontSize: 16, color: '#e6e6e6' }}>Kết thúc</Text>
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
    },
});

export default VoiceCall;
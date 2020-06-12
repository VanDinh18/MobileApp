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

    componentDidMount() {
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

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={wallpaper}
                    style={styles.wallpaper}>
                    <View style={styles.img}>
                        <Image
                            style={{ height: DEVICE_WIDTH / 4, width: DEVICE_WIDTH / 4, borderRadius: DEVICE_WIDTH / 8 }}
                        />
                    </View>
                    <View style={styles.username}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#e6e6e6' }}></Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 18, color: '#e6e6e6' }}>Đang đổ chuông...</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={{ fontSize: 16, color: '#e6e6e6' }}></Text>
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
                                        source={mic} />
                                    :
                                    <Image
                                        style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20 }}
                                        source={mic_off} />
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
                {/* {
                    this.state.peerIds.length > 1
                        ? <View style={{ flex: 1 }}>
                            <View style={{ height: dimensions.height * 3 / 4 - 50 }}>
                                <AgoraView style={{ flex: 1 }}
                                    remoteUid={this.state.peerIds[0]} mode={1} key={this.state.peerIds[0]} />
                            </View>
                            <View style={{ height: dimensions.height / 4 }}>
                                <ScrollView horizontal={true} decelerationRate={0}
                                    snapToInterval={dimensions.width / 2} snapToAlignment={'center'} style={{ width: dimensions.width, height: dimensions.height / 4 }}>
                                    {
                                        this.state.peerIds.slice(1).map((data) => (
                                            <TouchableOpacity style={{ width: dimensions.width / 2, height: dimensions.height / 4 }}
                                                onPress={() => this.peerClick(data)} key={data}>
                                                <AgoraView style={{ width: dimensions.width / 2, height: dimensions.height / 4 }}
                                                    remoteUid={data} mode={1} key={data} />
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        </View>
                        : this.state.peerIds.length > 0
                            ? <View style={{ height: dimensions.height - 50 }}>
                                <AgoraView style={{ flex: 1 }}
                                    remoteUid={this.state.peerIds[0]} mode={1} />
                            </View>
                            : <Text>No users connected</Text>
                } */}
                {/* {
                    !this.state.vidMute                                              //view for local video
                        ? <AgoraView style={styles.localVideoStyle} zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
                        : <View />
                } */}
                {/* <View style={styles.buttonBar}>
                    <Icon.Button style={styles.iconStyle}
                        backgroundColor="#0093E9"
                        name={this.state.audMute ? 'mic-off' : 'mic'}
                        onPress={() => this.toggleAudio()}
                    />
                    <Icon.Button style={styles.iconStyle}
                        backgroundColor="#0093E9"
                        name="call-end"
                        onPress={() => this.endCall()}
                    />
                    <Icon.Button style={styles.iconStyle}
                        backgroundColor="#0093E9"
                        name={this.state.vidMute ? 'videocam-off' : 'videocam'}
                        onPress={() => this.toggleVideo()}
                    />
                </View> */}
            </View>
        )
    }
}
let dimensions = {                                            //get dimensions of the device to use in view styles
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
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
    buttonBar: {
        height: 50,
        backgroundColor: '#0093E9',
        display: 'flex',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    localVideoStyle: {
        width: 140,
        height: 160,
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 100,
    },
    iconStyle: {
        fontSize: 34,
        paddingTop: 15,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        borderRadius: 0,
    },
});

export default VoiceCall;
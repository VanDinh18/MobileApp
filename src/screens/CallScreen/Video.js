/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, StyleSheet, NativeModules, ScrollView, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import firebase from '@react-native-firebase/app';
import io from 'socket.io-client';
import User from '../../components/User';

import mic_off from '../../assets/images/mic_off.png';
import mic from '../../assets/images/mic.png';
import phone_cancle from '../../assets/images/phone_cancle.png';
import video from '../../assets/images/video.png';
import video_off from '../../assets/images/video_off.png';

const { Agora } = NativeModules;                  //Define Agora object as a native module

const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Adaptative,
} = Agora;                                        //Set defaults for Stream

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerIds: [],                                                  //Array for storing connected peers
      uid: Math.floor(Math.random() * 100),                           //Generate a UID for local user
      appid: "0fedc73812c342aead62b3e673222b01",                    //Enter the App ID generated from the Agora Website
      receiver: props.navigation.state.params.data.receiver,
      sender: props.navigation.state.params.data.sender,
      avatarReceiver: '',
      avatarSender: '',      //Channel Name for the current session
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
    });
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
  /**
  * @name toggleAudio
  * @description Function to toggle local user's audio
  */
  toggleAudio() {
    let mute = this.state.audMute;
    console.log('Audio toggle', mute);
    RtcEngine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }
  /**
  * @name toggleVideo
  * @description Function to toggle local user's video
  */
  toggleVideo() {
    let mute = this.state.vidMute;
    console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    RtcEngine.muteLocalVideoStream(!this.state.vidMute);
  }
  /**
  * @name endCall
  * @description Function to end the call
  */
  endCall() {
    RtcEngine.destroy();
    var data = 'abc';
    this.socket.emit("client-send-end", data);
  }
  /**
  * @name peerClick
  * @description Function to swap the main peer videostream with a different peer videostream
  */
  peerClick(data) {
    let peerIdToSwap = this.state.peerIds.indexOf(data);
    this.setState(prevState => {
      let currentPeers = [...prevState.peerIds];
      let temp = currentPeers[peerIdToSwap];
      currentPeers[peerIdToSwap] = currentPeers[0];
      currentPeers[0] = temp;
      return { peerIds: currentPeers };
    });
  }
  /**
  * @name videoView
  * @description Function to return the view for the app
  */
  videoView() {
    return (
      <View style={{ flex: 1, resizeMode: "cover", }}>
        {
          this.state.peerIds.length > 1
            ? <View style={{ flex: 1 }}>
              <View style={{ height: DEVICE_HEIGHT * 3 / 4 - 50 }}>
                <AgoraView style={{ flex: 1 }}
                  remoteUid={this.state.peerIds[0]} mode={1} key={this.state.peerIds[0]} />
              </View>
              <View style={{ height: DEVICE_HEIGHT / 4 }}>
                <ScrollView horizontal={true} decelerationRate={0}
                  snapToInterval={DEVICE_WIDTH / 2} snapToAlignment={'center'} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 4 }}>
                  {
                    this.state.peerIds.slice(1).map((data) => (
                      <TouchableOpacity style={{ width: DEVICE_WIDTH / 2, height: DEVICE_HEIGHT / 4 }}
                        onPress={() => this.peerClick(data)} key={data}>
                        <AgoraView style={{ width: DEVICE_WIDTH / 2, height: DEVICE_HEIGHT / 4 }}
                          remoteUid={data} mode={1} key={data} />
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View>
            </View>
            : this.state.peerIds.length > 0
              ? <View style={{ height: DEVICE_HEIGHT }}>
                <AgoraView style={{ flex: 1 }}
                  remoteUid={this.state.peerIds[0]} mode={1} />
              </View>
              : <Text>No users connected</Text>
        }
        {
          !this.state.vidMute                                              //view for local video
            ? <AgoraView style={styles.localVideoStyle} zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
            : <View />
        }
        <View style={styles.button}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.toggleAudio()}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              {this.state.audMute
                ?
                <Image
                  style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20}}
                  source={mic_off} />
                :
                <Image
                  style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20}}
                  source={mic} />
              }

              <Text style={{ fontSize: 16, color: '#bfbfbf' }}>Loa</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.endCall()}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20 }}
                source={phone_cancle} />
              <Text style={{ fontSize: 16, color: '#bfbfbf' }}>Kết thúc</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.toggleVideo()}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              {this.state.vidMute
                ?
                <Image
                  style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20}}
                  source={video_off} />
                :
                <Image
                  style={{ height: DEVICE_WIDTH / 6, width: DEVICE_WIDTH / 6, borderRadius: DEVICE_WIDTH / 12, marginBottom: 20}}
                  source={video} />
              }
              <Text style={{ fontSize: 16, color: '#bfbfbf' }}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return this.videoView();
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    width: DEVICE_WIDTH,
    position: 'absolute',
    top: DEVICE_HEIGHT / 4 * 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 99,
  },
  localVideoStyle: {
    width: 140,
    height: 160,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
});

export default Video;

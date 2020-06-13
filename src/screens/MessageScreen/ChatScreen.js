import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
} from 'react-native';

import { imagePickerOptions, uploadFileToFireBase } from '../../utils';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import io from 'socket.io-client';
import User from '../../components/User';
import ItemFlatListMessage from '../../components/ItemFlatListMessage';

import send from '../../assets/images/send.png';
import upload from '../../assets/images/upload.png';
import goback from '../../assets/images/goback.png';
import smallcircle from '../../assets/images/smallcircle.png';
import video_call from '../../assets/images/video_call.png';
import voice_call from '../../assets/images/voice_call.png';

export default class ChatScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            textMessage: '',
            Data: [],
            person: {
                name: props.navigation.state.params.name,
                avatar: props.navigation.state.params.avatar,
            },
        };
        this.socket = io("https://fierce-bayou-19142.herokuapp.com/", { jsonp: false });
        this.sendMessage = this.sendMessage.bind(this);
        this.goback = this.goback.bind(this);
        this.gotoChatSettingScreen = this.gotoChatSettingScreen.bind(this);
    }

    goback(navigation) {
        navigation.navigate('MessageScreen');
    }
    gotoVideoCallScreen = (navigation) => {
        var ChannelName = this.state.person.name;
        var data = {
            receiver: ChannelName,
            sender: User.username,
        }

        this.socket.emit("client-send", data);
        navigation.navigate(
            'Video',
            {
                data: data,
            }
        );
    }

    gotoVoiceCallScreen = (navigation) => {
        var data = {
            receiver: this.state.person.name,
            sender: User.username,
        }
        this.socket.emit("client-voice-send", data);
        navigation.navigate(
            'VoiceCall',
            {
                data: data,
            }
        );
    }

    gotoChatSettingScreen(navigation) {
        navigation.navigate('ChatSettingScreen', { name: this.state.person.name, avatar: this.state.person.avatar });
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    async sendMessage(titleUsername) {
        if (this.state.textMessage.length > 0) {
            var msgId = firebase.database().ref('messages').child(User.username).child(titleUsername).push().key;
            var updates = {};
            var message = {
                checkimage: 0,
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.username,
            }
            updates['messages/' + User.username + '/' + titleUsername + '/' + msgId] = message;
            updates['messages/' + titleUsername + '/' + User.username + '/' + msgId] = message;
            await firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }
    monitorFileUpload = (uploadTask) => {
        var titleUsername = this.state.person.name;
        uploadTask.on('state_changed',
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            function (error) {

            },
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    var msgId = firebase.database().ref('messages').child(User.username).child(titleUsername).push().key;
                    var updates = {};
                    var message = {
                        checkimage: 1,
                        message: downloadURL,
                        time: firebase.database.ServerValue.TIMESTAMP,
                        from: User.username,
                    }
                    updates['messages/' + User.username + '/' + titleUsername + '/' + msgId] = message;
                    updates['messages/' + titleUsername + '/' + User.username + '/' + msgId] = message;
                    firebase.database().ref().update(updates);
                });
            });
    };
    uploadFile = () => {
        ImagePicker.launchImageLibrary(imagePickerOptions, response => {
            if (response.didCancel) {
                Alert.alert('Hủy đăng ảnh');
            } else if (response.error) {
                Alert.alert('Đã xảy ra lỗi: ', response.error);
            } else {
                const uploadTask = uploadFileToFireBase(response);
                this.monitorFileUpload(uploadTask);
            }
        }
        );
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            firebase.database().ref('messages').child(User.username).child(this.state.person.name)
                .on('child_added', (value) => {
                    this.setState((prevState) => {
                        return {
                            Data: [...prevState.Data, value.val()]
                        }
                    })
                })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
        firebase.database().ref('messages').child(User.username).child(this.state.person.name).off('child_added');
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.goback(navigation)}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }} >
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={goback} />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 4,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{ height: DEVICE_WIDTH / 9, width: DEVICE_WIDTH / 9, borderRadius: DEVICE_WIDTH / 18, alignItems: 'center', justifyContent: 'center' }}
                                source={this.state.person.avatar ? { uri: this.state.person.avatar } : null}
                            />
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text
                                style={{ fontSize: 18, color: 'white' }}
                                numberOfLines={1}>
                                {this.state.person.name}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.gotoVoiceCallScreen(navigation)}>
                            <Image
                                style={{ height: 25, width: 25, tintColor: 'white' }}
                                source={voice_call} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.gotoVideoCallScreen(navigation)}>
                            <Image
                                style={{ height: 25, width: 25, tintColor: 'white' }}
                                source={video_call} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.gotoChatSettingScreen(navigation)}>
                            <Image
                                style={{ height: 30, width: 30, tintColor: 'white' }}
                                source={smallcircle} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bodyMessage}>
                    <FlatList
                        data={this.state.Data}
                        renderItem={({ item }) => (
                            <ItemFlatListMessage
                                item={item} />
                        )}
                        keyExtractor={(item, index) => index.toString()} />
                </View>

                <View style={styles.wrapperInputMessage}>
                    <TouchableOpacity
                        style={styles.buttonUpload}
                        onPress={() => this.uploadFile()}>
                        <Image
                            source={upload}
                            style={{ height: 25, width: 25, tintColor: '#66b3ff' }} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputMessage}
                        placeholder='Nhập tin nhắn...'
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity
                        style={styles.buttonSend}
                        onPress={() => this.sendMessage(this.state.person.name)}>
                        <Image
                            style={{ height: 25, width: 25, tintColor: '#66b3ff' }}
                            source={send} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#66b3ff',
    },
    bodyMessage: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    wrapperInputMessage: {
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonUpload: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputMessage: {
        flex: 1,
        height: 40,
        // marginHorizontal: 10,
        paddingLeft: 20,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    buttonSend: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

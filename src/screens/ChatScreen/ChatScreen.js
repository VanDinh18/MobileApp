import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import User from '../../components/User';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textMessage: '',
        }
        this.sendMessage = this.sendMessage.bind(this);

    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    sendMessage = async (titleUsername) => {
        console.log(titleUsername);//người mà mình đang nhắn
        console.log(User.username);//bản thân 
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.username).child(titleUsername).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.username,
            }
            updates['messages/' + User.username + '/' + titleUsername + '/' + msgId] = message;
            updates['messages/' + titleUsername + '/' + User.username + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }
    // sendMessage = async (titleUsername) => {
    //     console.log(titleUsername);
    //     console.log(User.username);
    //     if(this.state.textMessage.length > 0 ){
    //         let msgId = firebase.database().ref('messages').child('aa').child(titleUsername).push().key;
    //         let updates = {};
    //         let message = {
    //             message: this.state.textMessage,
    //             time: firebase.database.ServerValue.TIMESTAMP,
    //             from: 'aa',
    //         }
    //         updates['messages/' + 'aa' + '/' + titleUsername + '/' + msgId] = message;
    //         updates['messages/' + titleUsername + '/' + 'aa' + '/' + msgId] = message;
    //         firebase.database().ref().update(updates);
    //         this.setState({textMessage: ''});
    //     }
    // }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 30 }}>{params.titleUsername}</Text>
                </View>
                <View style={styles.listMessage}>
                    <Text>Listmessage</Text>
                </View>
                <View style={styles.wrapperInputMessage}>
                    <TextInput
                        style={styles.inputMessage}
                        placeholder='Your message'
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity
                        onPress={() => this.sendMessage('1')}
                    >
                        <Text style={{ fontSize: 30 }}>
                            Send
                        </Text>
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
        justifyContent: 'space-between'
    },
    header: {
        height: 30,

    },
    listMessage: {

    },
    wrapperInputMessage: {

    },
    inputMessage: {

    }
});

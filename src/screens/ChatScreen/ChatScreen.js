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
        this.goback = this.goback.bind(this);
    }

    goback = (navigation) => {
        navigation.navigate('MessageScreen');
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    sendMessage = async (titleUsername) => {
        console.log(titleUsername);//người mà mình đang nhắn
        console.log(User.username);//bản thân 
        if (this.state.textMessage.length > 0) {
            var msgId = firebase.database().ref('messages').child(User.username).child(titleUsername).push().key;
            var updates = {};
            var message = {
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

    render() {
        const { params } = this.props.navigation.state;
        const { navigation } = this.props;

        return (
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={() => this.goback(navigation)}
                >
                    <Text>goback</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={{ fontSize: 30 }}>{params.name}</Text>
                </View>
                <View style={styles.wrapperInputMessage}>
                    <TextInput
                        style={styles.inputMessage}
                        placeholder='Your message'
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity
                        onPress={() => this.sendMessage(params.name)}
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
    wrapperInputMessage: {

    },
    inputMessage: {

    }
});

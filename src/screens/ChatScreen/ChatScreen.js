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
    KeyboardAvoidingView,
} from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import User from '../../components/User';
import goback from '../../assets/images/goback.png';
import smallcircle from '../../assets/images/smallcircle.png';
import ItemFlatListMessage from '../../components/ItemFlatListMessage';
import send from '../../assets/images/send.png';

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
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.goback = this.goback.bind(this);
        this.gotoChatSettingScreen = this.gotoChatSettingScreen.bind(this);
    }

    goback(navigation) {
        navigation.navigate('MessageScreen');
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
                            flex: 5,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{ height: 50, width: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}
                                source={this.state.person.avatar ? { uri: this.state.person.avatar } : null}
                            />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>{this.state.person.name}</Text>
                        </View>
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

                <KeyboardAvoidingView style={styles.bodyMessage}>
                    <FlatList
                        data={this.state.Data}
                        renderItem={({ item }) => (
                            <ItemFlatListMessage
                                item={item} />
                        )}
                        keyExtractor={(item, index) => index.toString()} />
                </KeyboardAvoidingView>

                <View style={styles.wrapperInputMessage}>
                    <TextInput
                        style={styles.inputMessage}
                        placeholder='Your message'
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity
                        style={styles.buttonSend}
                        onPress={() => this.sendMessage(this.state.person.name)}>
                        <Image
                            style={{ height: 30, width: 30, tintColor: '#66b3ff' }}
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
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#66b3ff',
    },
    bodyMessage: {
        flex: 10,
        backgroundColor: '#f2f2f2',
    },
    wrapperInputMessage: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputMessage: {
        flex: 5,
        width: 0.86 * DEVICE_WIDTH,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 20,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    buttonSend: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

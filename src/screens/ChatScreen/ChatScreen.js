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

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import User from '../../components/User';
import img from '../../assets/images/goback.png';
import avatarImg from '../../assets/images/avatar.jpg';
import ItemFlatListMessage from '../../components/ItemFlatListMessage';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textMessage: '',
            Data: [],
            person: {
                name: props.navigation.state.params.name
            },
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

    componentDidMount() {
        firebase.database().ref('messages').child(User.username).child(this.state.person.name)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        Data: [...prevState.Data, value.val()]
                    }
                })
            })
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
                        }}
                    >
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white'}}
                            source={img}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 5,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{height: 50, width: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}
                                source={avatarImg}
                            />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={{ fontSize: 24, color: 'white'}}>{this.state.person.name}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1,}}>

                    </View>
                </View>


                <KeyboardAvoidingView style={styles.bodyMessage}>
                    <FlatList
                        data={this.state.Data}
                        renderItem={({ item }) => (
                            <ItemFlatListMessage
                                item={item}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
                        onPress={() => this.sendMessage(this.state.person.name)}
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
        backgroundColor: 'gray',
    },
    inputMessage: {
        flex: 5
    },
    buttonSend: {
        flex: 1
    }
});

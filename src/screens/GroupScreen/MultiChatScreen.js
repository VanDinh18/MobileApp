import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import ItemFlatListMessageGroup from '../../components/ItemFlatListMessageGroup';
import goback from '../../assets/images/goback.png';
import smallcircle from '../../assets/images/smallcircle.png';
import send from '../../assets/images/send.png';

class MultiChatScreen extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            textMessage: '',
            Data: [],
            group: {
                chatkey: props.navigation.state.params.chatkey,
                members: props.navigation.state.params.members,
                groupname: props.navigation.state.params.groupname,
                groupavatar: props.navigation.state.params.groupavatar,
                content: props.navigation.state.params.content,
            }
        };
        this.goback = this.goback.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.gotoMultiChatSettingScreen = this.gotoMultiChatSettingScreen.bind(this);
    }
    _isMounted = false;
    handleChange = key => val => {
        this.setState({ [key]: val });
    }
    goback(navigation) {
        navigation.navigate('GroupScreen');
    }
    gotoMultiChatSettingScreen(navigation) {
        navigation.navigate(
            'MultiChatSettingScreen',
            {
                chatkey: this.state.group.chatkey,
                members: this.state.group.members,
                groupname: this.state.group.groupname,
                groupavatar: this.state.group.groupavatar,
                content: this.state.group.content,
            }
        )
    }
    sendMessage() {
        if (this.state.textMessage.length > 0) {
            var Root = firebase.database().ref('groups').child(User.username);
            var msgId = Root.child(this.state.group.chatkey).child('content').push().key;
            var updates = {};
            var message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.username,
            };
            for (var i = 0; i < this.state.group.members.length; i++) {
                updates['groups/' + this.state.group.members[i] + '/' + this.state.group.chatkey + '/' + 'content' + '/' + msgId] = message;
            }
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }
    componentDidMount =() =>{
        this._isMounted = true;
        var Root = null;
        var newRoot = null;
        if (this._isMounted) {
            Root = firebase.database().ref('groups').child(User.username);
            newRoot = Root.child(this.state.group.chatkey).child('content');
            newRoot.on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        Data: [...prevState.Data, value.val()]
                    }
                })
            })
        }
        else{
            Root.off('value');
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
                        }}>
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={goback}
                        />
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
                                source={this.state.group.groupavatar ? { uri: this.state.group.groupavatar } : null}
                            />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>{this.state.group.groupname}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.gotoMultiChatSettingScreen(navigation)}>
                            <Image
                                style={{ height: 30, width: 30, tintColor: 'white' }}
                                source={smallcircle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView style={styles.bodyMessage}>
                    <FlatList
                        data={this.state.Data}
                        renderItem={({ item, index }) => (
                            <ItemFlatListMessageGroup
                                item={item}
                                index={index}
                                Data={this.state.Data} />
                        )}
                        keyExtractor={(item, index) => index.toString()} />
                </KeyboardAvoidingView>
                <View style={styles.wrapperInputMessage}>
                    <TextInput
                        style={styles.inputMessage}
                        placeholder='Nhập tin nhắn...'
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')} />
                    <TouchableOpacity
                        style={styles.buttonSend}
                        onPress={() => this.sendMessage()}>
                        <Image
                            style={{ height: 30, width: 30, tintColor: '#66b3ff' }}
                            source={send} />
                    </TouchableOpacity>
                </View>
            </View>
        )
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

export default MultiChatScreen;
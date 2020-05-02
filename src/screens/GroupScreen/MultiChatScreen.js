import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';

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
                content: props.navigation.state.params.content,
            }
        };
        this.goback = this.goback.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }
    handleChange = key => val => {
        this.setState({ [key]: val });
    }
    goback(navigation) {
        navigation.navigate('GroupScreen');
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
            // updates['groups/' + User.username + '/' + this.state.group.chatkey + '/' + 'content' + '/' + msgId] = message;
            // updates['groups/' + 'vuduy' + '/' + this.state.group.chatkey + '/' + 'content' + '/' + msgId] = message;
            // updates['groups/' + 'nguyendinh' + '/' + this.state.group.chatkey + '/' + 'content' + '/' + msgId] = message;
            firebase.database().ref().update(updates);


            this.setState({ textMessage: '' });
        }
    }
    componentDidMount() {

    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.goback(navigation)}
                    >
                        <Text>goback</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyMessage}>

                </View>
                <View style={styles.wrapperInputMessage}>
                    <TextInput
                        style={styles.inputMessage}
                        placeholder='Your message'
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity
                        style={styles.buttonSend}
                        onPress={() => this.sendMessage()}
                    >
                        <Text style={{ fontSize: 30 }}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

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

export default MultiChatScreen;
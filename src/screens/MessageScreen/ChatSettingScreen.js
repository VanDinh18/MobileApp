import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import goback from '../../assets/images/goback.png';
import chatsetting from '../../assets/images/chatsetting.png';

class ChatSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.state.params.name,
                avatar: props.navigation.state.params.avatar,
            },
            email: ''
        }
        this.goback = this.goback.bind(this);
    }

    goback(navigation) {
        navigation.navigate('ChatScreen', { name: this.state.person.name, avatar: this.state.person.avatar });
    }

    componentDidMount = async () => {
        var username = this.state.person.name;
        const Root = firebase.database().ref('users');
        Root.child(username).on('value', value => {
            this.setState({
                email: value.val().email,
            })
        })
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
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
                            source={goback} />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 5,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Tùy chỉnh</Text>
                    </View>
                    <View
                        style={{
                            flex: 1, justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Image
                            style={{ height: 30, width: 30, tintColor: 'white' }}
                            source={chatsetting} />
                    </View>
                </View>

                <View style={styles.body}>
                    <ScrollView>
                        <View style={styles.avatar}>
                            <Image
                                style={{ height: DEVICE_WIDTH / 4, width: DEVICE_WIDTH / 4, borderRadius: DEVICE_WIDTH / 8, marginTop: DEVICE_HEIGHT / 10 }}
                                source={this.state.person.avatar ? { uri: this.state.person.avatar } : null}
                            />
                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: DEVICE_HEIGHT / 30 }}>{this.state.person.name}</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: DEVICE_HEIGHT / 50 }}>{this.state.email}</Text>
                        </View>
                        <View style={styles.option}>

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#66b3ff',
    },
    body: {
        flex: 11,
        flexDirection: 'column',
    },
    avatar: {
        alignItems: 'center',
    },
    option: {

    }
})

export default ChatSettingScreen;
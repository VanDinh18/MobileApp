import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
    Dimensions,
} from 'react-native';
import firebase from '@react-native-firebase/app';

export default class ButtonSubmitLogin extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        };

    }

    loginAccount = (navigation, emailLog, passwordLog) => {
        //setTimeout(()=> console.log(emailLog + '-' + passwordLog), 1000);
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(emailLog, passwordLog)
                .then(res => {
                    console.log(res.user.email);
                    navigation.navigate('HomeScreen',
                        {
                            itemId: res.user.email,
                        }
                    );
                });
        } catch (error) {
            console.log(error.toString(error));
        }
    }

    render() {
        const { TextButton, navigation, emailLog, passwordLog } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.loginAccount(navigation, emailLog, passwordLog)}
                >
                    <Text style={styles.text}>{TextButton}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: '#e600e6',
        height: 40,
        width: 0.86 * DEVICE_WIDTH,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    }
});

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
import '@react-native-firebase/auth';


export default class ButtonSubmitRegister extends Component {
    constructor() {
        super();
        this.state = {

        };
        this.registerAccount = this.registerAccount.bind(this);
    }

    registerAccount = (emailSub, passwordSub, navigation) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailSub, passwordSub)
                .then(user => {
                    console.log(user);
                });
            console.log('Resgister Successfull !!!');
            navigation.navigate("LoginScreen");
        } catch (error) {
            console.log(error.toString(error));
        }
    }

    render() {
        const { TextButton, emailSub, passwordSub, navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.registerAccount(emailSub, passwordSub, navigation)}
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
        flex: 0.5,
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

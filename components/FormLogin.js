import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

import UserInputLogin from './UserInputLogin';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg from '../assets/images/eye_black.png';

export default class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
            emailLogin: '',
            passwordLogin: '',
        };
        this.showPass = this.showPass.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    showPass() {
        this.state.press === false
            ? this.setState({ showPass: false, press: true })
            : this.setState({ showPass: true, press: false });
    }

    /*lấy dữ liệu từ component con UserInputLogin  về component cha FormLogin */
    callbackFunction = (field, id) => {
        // setTimeout(() => console.log("field: " + field), 1000);
        if (id == "Email") {
            this.setState({ emailLogin: field });
            this.sendData(field, this.state.passwordLogin);
        }
        if (id == "Password") {
            this.setState({ passwordLogin: field })
            this.sendData(this.state.emailLogin, field);
        }
    }

    /*send data from FormLogin to LoginScreen*/
    sendData = (emailLogin, passwordLogin) => {
        this.props.parentCallback(emailLogin, passwordLogin);
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <UserInputLogin
                    source={usernameImg}
                    placeholder="Email"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    parentCallback={this.callbackFunction}
                />
                <UserInputLogin
                    source={passwordImg}
                    secureTextEntry={this.state.showPass}
                    placeholder="Password"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    parentCallback={this.callbackFunction}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye}
                    onPress={this.showPass}>
                    <Image source={eyeImg} style={styles.iconEye} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: DEVICE_HEIGHT / 11, //12 flex
        right: 40,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});

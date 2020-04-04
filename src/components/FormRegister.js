import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
} from 'react-native';

import UserInputLogin from './UserInputLogin';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg from '../assets/images/eye_black.png';

export default class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
            emailRegister: '',
            passwordRegister: '',
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

    callbackFunction (field, id) {
        if (id == "Email") {
            this.setState({ emailRegister: field })
        }
        if (id == "Password") {
            this.setState({ passwordRegister: field })
        }
        this.sendData();
        // setTimeout(
        //     () => console.log(this.state.emailRegister + "---" + this.state.passwordRegister + "---" + id)
        //     , 1500
        // )
    }

    /*send data from FormRegister to RegisterScreen*/
    sendData = () => {
        this.props.parentCallback(this.state.emailRegister, this.state.passwordRegister)
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <UserInputLogin
                    source={usernameImg}
                    placeholder="Username"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                />
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
                <UserInputLogin
                    source={passwordImg}
                    secureTextEntry={this.state.showPass}
                    placeholder="Confirm Password"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
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
        flex: 2,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: DEVICE_HEIGHT / 6, //12 flex
        right: 40,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});

import { Component } from "react";
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';


import Wallpaper from '../../components/Wallpaper';
import LogoLogin from '../../components/LogoLogin';
import FormRegister from '../../components/FormRegister';
import ButtonSubmitCancle from '../../components/ButtonSubmitCancle';
import ButtonSubmitRegister from '../../components/ButtonSubmitRegister';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSub: '',
            passwordSub: '',
        };
        this.callbackFunction = this.callbackFunction.bind(this);
    }

    callbackFunction = (email, password) => {
        this.setState({ emailSub: email, passwordSub: password })
    }

    render() {
        return (
            <Wallpaper>
                <LogoLogin />
                <FormRegister parentCallback={this.callbackFunction} />
                <ButtonSubmitRegister
                    TextButton='REGISTER'
                    navigation={this.props.navigation}
                    emailSub={this.state.emailSub}
                    passwordSub = {this.state.passwordSub}
                />
                <ButtonSubmitCancle
                    TextButton='CANCLE'
                    navigation={this.props.navigation}
                />
            </Wallpaper>
        );
    }

}

export default RegisterScreen;

import { Component } from "react";
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';


import Wallpaper from '../../components/Wallpaper';
import LogoLogin from '../../components/LogoLogin';
import FormLogin from '../../components/FormLogin';
import SignUpSectionLogin from '../../components/SignupSectionLogin';
import ButtonSubmitLogin from '../../components/ButtonSubmitLogin';
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailLogin: '',
            passwordLogin: '',
        }
        this.callbackFuncion = this.callbackFuncion.bind(this);
    }

    callbackFuncion = (email, password) => {
        this.setState({ emailLogin: email, passwordLogin: password });
        //setTimeout(()=> console.log(email + '-' + password), 1000);
    }

    render() {  
        return (
            <Wallpaper>
                <LogoLogin />
                <FormLogin parentCallback={this.callbackFuncion} />
                <ButtonSubmitLogin
                    TextButton='LOGIN'
                    navigation={this.props.navigation}
                    emailLog={this.state.emailLogin}
                    passwordLog={this.state.passwordLogin}
                />
                <SignUpSectionLogin navigation={this.props.navigation} />
            </Wallpaper>
        );
    }
}


export default LoginScreen;

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
            usernameSub: '',
        };
        this.callbackFunction = this.callbackFunction.bind(this);
    }

    callbackFunction = (email, password, username) => {
        this.setState({ emailSub: email, passwordSub: password, usernameSub: username})
        //setTimeout(() => console.log(this.state.emailSub+"-"+this.state.passwordSub+"-"+this.state.usernameSub), 1000);
    }

    render() {
        return (
            <Wallpaper>
                <LogoLogin />
                <FormRegister parentCallback={this.callbackFunction} />
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                }}>
                    <ButtonSubmitRegister
                        TextButton='REGISTER'
                        navigation={this.props.navigation}
                        emailSub={this.state.emailSub}
                        passwordSub={this.state.passwordSub}
                        usernameSub={this.state.usernameSub}
                    />
                    <ButtonSubmitCancle
                        TextButton='CANCLE'
                        navigation={this.props.navigation}
                    />
                </View>
            </Wallpaper>
        );
    }

}

export default RegisterScreen;

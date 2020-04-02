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
class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Wallpaper>
                <LogoLogin/>
                <FormLogin/>
                <ButtonSubmitLogin/>
                <SignUpSectionLogin/>
            </Wallpaper>
        );
    }
}

export default LoginScreen;

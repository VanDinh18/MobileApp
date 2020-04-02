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
import FormRegister from '../../components/FormRegister';

import ButtonSubmitRegister from '../../components/ButtonSubmitRegister';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Wallpaper>
                <LogoLogin />
                <FormRegister />
                <ButtonSubmitRegister TextButton='REGISTER' />
                <ButtonSubmitRegister TextButton='CANCLE' />
            </Wallpaper>
        );
    }

}

export default RegisterScreen;

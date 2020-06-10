import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
} from 'react-native';

import Wallpaper from '../../components/Wallpaper';
import LogoLogin from '../../components/LogoLogin';
import FormChangePassword from '../../components/FormChangePassword';
import ButtonSubmitCancle from '../../components/ButtonSubmitCancle';
import ButtonChangePassword from '../../components/ButtonChangePassword';

const HEIGHT = Dimensions.get('window').height

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newpassword: '',
        }
    }
    callbackFunction = (password, newpassword) => {
        password = password.replace(/\s+/g, '');
        newpassword = newpassword.replace(/\s+/g, '');
        this.setState({
            password: password,
            newpassword: newpassword,
        });
        //setTimeout(() => console.log(this.state.password.replace(/\s+/g, '') + '--' + this.state.newpassword.replace(/\s+/g, '')), 500);
    };
    render() {
        return (
            <Wallpaper>
                <LogoLogin />
                <FormChangePassword parentCallback={this.callbackFunction} />
                <View
                    style={{
                        height: 50,
                        flexDirection: 'row',
                    }}>
                    <ButtonChangePassword
                        TextButton="SUBMIT"
                        navigation={this.props.navigation}
                        password={this.state.password}
                        newpassword={this.state.newpassword}
                    />
                    <ButtonSubmitCancle
                        TextButton="CANCLE"
                        navigation={this.props.navigation}
                        screen="SettingsScreen"
                    />
                </View>
            </Wallpaper>
        )
    }
}

export default ChangePassword;
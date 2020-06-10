import {Component} from 'react';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';

import Wallpaper from '../../components/Wallpaper';
import LogoLogin from '../../components/LogoLogin';
import FormForgotPassword from '../../components/FormForgotPassword';
import ButtonResetEmail from '../../components/ButtonResetEmail';
import ButtonSubmitCancle from '../../components/ButtonSubmitCancle';

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSub: '',
    };
    this.callbackFuncion = this.callbackFuncion.bind(this);
  }
  callbackFuncion = email => {
    this.setState({emailSub: email});
  };

  render() {
    return (
      <Wallpaper>
        <LogoLogin />
        <FormForgotPassword parentCallback={this.callbackFuncion} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <ButtonResetEmail
            TextButton="RESET PASSWORD"
            navigation={this.props.navigation}
            emailSub={this.state.emailSub}
          />
          <ButtonSubmitCancle
            TextButton="CANCLE"
            navigation={this.props.navigation}
            screen="LoginScreen"
          />
        </View>
      </Wallpaper>
    );
  }
}

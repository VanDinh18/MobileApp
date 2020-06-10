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

export default class FormChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newpassword: '',
    };
    this.callbackFunction = this.callbackFunction.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  /*lấy dữ liệu từ component con UserInputLogin  về component cha FormRegister */
  callbackFunction = (field, id) => {
    if (id == 'Password') {
      this.setState({ password: field });
      this.sendData(
        field,
        this.state.newpassword,
      );
    }
    if (id == 'NewPassword') {
      this.setState({ newpassword: field });
      this.sendData(
        this.state.password,
        field,
      );
    }
  };

  /*send data from FormRegister to RegisterScreen*/
  sendData = (password, newpassword) => {
    this.props.parentCallback(
      password,
      newpassword,
    );
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInputLogin
          source={passwordImg}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          parentCallback={this.callbackFunction}
          password={true}
        />
        <UserInputLogin
          source={passwordImg}
          placeholder="NewPassword"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          parentCallback={this.callbackFunction}
          password={true}
        />
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: DEVICE_HEIGHT / 4.5,
    right: 40,
  },
});

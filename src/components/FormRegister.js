import React, {Component} from 'react';
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

export default class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameRegister: '',
      emailRegister: '',
      passwordRegister: '',
    };
    this.callbackFunction = this.callbackFunction.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  /*lấy dữ liệu từ component con UserInputLogin  về component cha FormRegister */
  callbackFunction = (field, id) => {
    if (id == 'Username') {
      this.setState({usernameRegister: field});
      this.sendData(
        this.state.emailRegister,
        this.state.passwordRegister,
        field,
      );
    }
    if (id == 'Email') {
      this.setState({emailRegister: field});
      this.sendData(
        field,
        this.state.passwordRegister,
        this.state.usernameRegister,
      );
    }
    if (id == 'Password') {
      this.setState({passwordRegister: field});
      this.sendData(
        this.state.emailRegister,
        field,
        this.state.usernameRegister,
      );
    }
  };

  /*send data from FormRegister to RegisterScreen*/
  sendData = (emailRegister, passwordRegister, usernameRegister) => {
    this.props.parentCallback(
      emailRegister,
      passwordRegister,
      usernameRegister,
    );
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInputLogin
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          parentCallback={this.callbackFunction}
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
          placeholder="Password"
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
    // flex: 2,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: DEVICE_HEIGHT / 4.5, //12 flex
    right: 40,
  },
});

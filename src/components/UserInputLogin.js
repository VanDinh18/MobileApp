import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import eyeImg from '../assets/images/eye_black.png';

export default class UserInputLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  /* send data from UserInputLogin to FormRegister */
  sendData = text => {
    this.props.parentCallback(text, this.props.placeholder);
  };

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  render() {
    return (
      <View style={styles.inputWrapper}>
        <Image source={this.props.source} style={styles.inlineImg} />
        {this.props.password ? (
          <>
            <TextInput
              style={styles.input}
              placeholder={this.props.placeholder}
              secureTextEntry={this.state.showPass}
              autoCorrect={this.props.autoCorrect}
              autoCapitalize={this.props.autoCapitalize}
              returnKeyType={this.props.returnKeyType}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={text => {
                this.sendData(text);
              }}
              value={this.state.text}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye}
              onPress={this.showPass.bind(this)}>
              <Image source={eyeImg} style={styles.iconEye} />
            </TouchableOpacity>
          </>
        ) : (
          <TextInput
            style={styles.input}
            placeholder={this.props.placeholder}
            secureTextEntry={this.props.showPass}
            autoCorrect={this.props.autoCorrect}
            autoCapitalize={this.props.autoCapitalize}
            returnKeyType={this.props.returnKeyType}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={text => {
              this.sendData(text);
            }}
            value={this.state.text}
          />
        )}
      </View>
    );
  }
}

UserInputLogin.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 0.86 * DEVICE_WIDTH,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
    zIndex: 50,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 50,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
    // position: 'absolute',
    // top: -10,
    // left: -62,
  },
  btnEye: {
    width: 30,
    height: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 7,
    right: 27,
    zIndex: 1000,
  },
});

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import User from '../components/User';

export default class ButtonSubmitLogin extends Component {
  constructor(props) {
    super(props);
    (this.unsubcriber = null),
      (this.state = {
        userData: null,
        userExist: null,
      });
  }

  storeData = async user => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (e) {
      console.log('Something went wrong', e);
    }
  };

  returnUser = email => {
    var array = this.state.userExist;
    for (var i = 0; i < array.length; i++) {
      if (email == array[i].email) {
        User.username = array[i].username;
        User.email = array[i].email;
      }
    }
    console.log(User);
  };
  validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }
  loginAccount = async (navigation, emailLog, passwordLog) => {
    try {
      if (this.validate(emailLog)) {
        await firebase
          .auth()
          .signInWithEmailAndPassword(emailLog, passwordLog)
          .then(res => {
            this.returnUser(emailLog);
            this.storeData(JSON.stringify(res.user));
            navigation.navigate('Main');
          })
          .catch(error => {
            if (error.code == 'auth/user-not-found') {
              Alert.alert('Error', 'email not found');
            } else if (error.code == 'auth/wrong-password') {
              Alert.alert('Error', 'password wrong');
            } else {
            }
          });
      }
      else {
        Alert.alert('Error', 'email wrong');
      }

    } catch (error) {
      console.log(error.toString(error));
    }
  };

  /*đăng ký người dùng mới */
  componentDidMount() {
    this.unsubcriber = firebase.auth().onAuthStateChanged(changedUser => {
      this.setState({ userData: changedUser });
    });
    firebase
      .database()
      .ref('/users')
      .on('value', snapshot => {
        this.setState({ userExist: Object.values(snapshot.val()) });
      });
  }

  componentWillUnmount() {
    if (this.unsubcriber) {
      this.unsubcriber();
    }
    firebase
      .database()
      .ref('/users')
      .off('value');
  }

  render() {
    const { TextButton, navigation, emailLog, passwordLog } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.loginAccount(navigation, emailLog, passwordLog)}>
          <Text style={styles.text}>{TextButton}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#e600e6',
    height: 40,
    width: 0.86 * DEVICE_WIDTH,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

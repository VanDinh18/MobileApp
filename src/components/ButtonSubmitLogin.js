import React, {Component} from 'react';
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
  constructor() {
    super();
    (this.unsubcriber = null),
      (this.state = {
        userData: null,
        userExist: null,
      });
    this.returnUser = this.returnUser.bind(this);
    this.loginAccount = this.loginAccount.bind(this);
  }

  storeData = async user => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (e) {
      console.log('Something went wrong', e);
    }
  };

  // getData = async (user) => {
  //     try {
  //         const userData = await AsyncStorage.getItem('userData');
  //         const data = JSON.parse(userData);
  //         console.log(data);
  //     } catch (e) {
  //         console.log("Something went wrong", e);
  //     }
  // }

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

  loginAccount = async (navigation, emailLog, passwordLog) => {
    console.log(emailLog + '--' + passwordLog);
    try {
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
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  /*đăng ký người dùng mới */
  componentDidMount() {
    this.unsubcriber = firebase.auth().onAuthStateChanged(changedUser => {
      this.setState({userData: changedUser});
    });
    firebase
      .database()
      .ref('/users')
      .on('value', snapshot => {
        this.setState({userExist: Object.values(snapshot.val())});
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
    const {TextButton, navigation, emailLog, passwordLog} = this.props;
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

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

export default class ButtonSubmitLogin extends Component {
    constructor() {
        super();
        this.unsubcriber = null,
            this.state = {
                userData: null,
            };

    }


    storeData = async (user) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(user));
        } catch (e) {
            console.log("Something went wrong", e);
        }
    }

    getData = async (user) => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const data = JSON.parse(userData);
            console.log(data);
        } catch (e) {
            console.log("Something went wrong", e);
        }
    }

    loginAccount = (navigation, emailLog, passwordLog) => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(emailLog, passwordLog)
                .then(res => {
                    //console.log(res.user.email);
                    this.storeData(JSON.stringify(res.user));
                    navigation.navigate('Main',
                        {
                            itemId: res.user.email,
                        }
                    );
                });
        } catch (error) {
            console.log(error.toString(error));
        }
    }

    /*đăng ký người dùng mới */
    componentDidMount() {
        this.unsubcriber = firebase.auth().onAuthStateChanged((changedUser) => {
            this.setState({ userData: changedUser });
        });
        console.log("ComponentDidMount buttonsubmitLogin");
    }

    componentWillUnmount() {
        if (this.unsubcriber) {
            this.unsubcriber();
        }
    }

    render() {
        const { TextButton, navigation, emailLog, passwordLog } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.loginAccount(navigation, emailLog, passwordLog)}
                >
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
        flex: 1,
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
    }
});

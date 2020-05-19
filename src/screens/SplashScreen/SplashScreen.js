import { Component } from "react";
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ImageBackground,
    Image,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import bgSrc from '../../assets/images/logo.png';
import AsyncStorage from "@react-native-community/async-storage";
import User from '../../components/User';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }
    _isMounted = false;
    performTimeConsumingTask = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const data = JSON.parse(userData);
        return new Promise((resolve, reject) => {
            setTimeout(
                () => { resolve(data) },
                1000)
        })
    }
    returnUser = (email) => {
        return new Promise((resolve, reject) => {
            var ref = firebase.database().ref('users');
            ref.on("value", snapshot => {
                var arr = Object.values(snapshot.val());
                for (var i = 0; i < arr.length; i++) {
                    if (email == arr[i].email) {
                        User.username = arr[i].username;
                        User.email = arr[i].email;
                    }
                }
                resolve(User);
            });
        });
    }
    componentDidMount = async () => {
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this._isMounted = true;
            if (this._isMounted) {
                const user = await this.returnUser(JSON.parse(data).email)
                console.log(user);
            }
            this.props.navigation.navigate('Main');
        }
        else {
            this.props.navigation.navigate('LoginScreen');
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={bgSrc}>

                </Image>
                <Text style={styles.text}>TALK MORE</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cc80ff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 80,
        width: 80,
    },
    text: {
        marginTop: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default SplashScreen;

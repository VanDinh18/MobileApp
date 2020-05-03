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
        this.state = {
            userExist: null,
        };
        this.returnUser = this.returnUser.bind(this);
    }

    performTimeConsumingTask = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const data = JSON.parse(userData);
        return new Promise((resolve, reject) => {
            setTimeout(
                () => { resolve(data) },
                2000)
        })
    }
    returnUser = (email) => {
        var array = this.state.userExist;
        for (var i = 0; i < array.length; i++) {
            if (email == array[i].email) {
                User.username = array[i].username;
                User.email = array[i].email;
            }
        }
        console.log(User);
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        firebase.database().ref('/users').on("value", snapshot => {
            this.setState({ userExist: Object.values(snapshot.val()) });
        });

        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            //console.log(JSON.parse(data));
            /** */
            this.returnUser(JSON.parse(data).email);
            this.props.navigation.navigate('Main');
        }
        else {
            this.props.navigation.navigate('LoginScreen');
        }
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

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

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyDllQxvKmzBl0KSgMwZMmO1RJWxp9XWn_k",
            authDomain: "mobileapp-12939.firebaseapp.com",
            databaseURL: "https://mobileapp-12939.firebaseio.com",
            projectId: "mobileapp-12939",
            storageBucket: "mobileapp-12939.appspot.com",
            messagingSenderId: "1088353540886",
            appId: "1:1088353540886:web:7c8b8ba4cbd390f2b88e37",
            measurementId: "G-RZJTPLXVZ1"
          };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
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

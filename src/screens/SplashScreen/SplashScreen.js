import { Component } from "react";
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,

} from 'react-native';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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
            <View style={{backgroundColor: 'orange'}}>
                <Text style={{ fontSize: 30 }}>splash</Text>
            </View>
        )
    }

}

export default SplashScreen;

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

export default class ButtonSubmitRegister extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        };

    }


    render() {
        const { TextButton } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
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
        flex: 0.5,
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

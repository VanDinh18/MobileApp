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

export default class ButtonSubmitCancle extends Component {
    constructor() {
        super();
    }

    render() {
        const { TextButton, navigation, screen } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate(screen)}>
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
        alignItems: 'flex-end',
        marginRight: 0.07*DEVICE_WIDTH,
    },
    button: {
        backgroundColor: '#e600e6',
        height: 40,
        width: 0.4 * DEVICE_WIDTH,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    }
});

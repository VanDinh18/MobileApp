import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';

export default class UserInputLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.sendData = this.sendData.bind(this);
    }

    /* send data from UserInputLogin to FormRegister */
    sendData = (text) => {
        this.props.parentCallback(text, this.props.placeholder);
    }

    render() {
        return (
            <View style={styles.inputWrapper}>
                <Image source={this.props.source} style={styles.inlineImg} />
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onChangeText={
                        (text) => {this.sendData(text) }
                    }
                    value={this.state.text}

                />
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
    },
    inputWrapper: {
        flex: 1,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
});

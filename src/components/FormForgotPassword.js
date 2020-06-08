import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

import UserInputLogin from './UserInputLogin';
import usernameImg from '../assets/images/username.png';


export default class FormForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {          
            emailLogin: '',
        };
        
        this.callbackFunction = this.callbackFunction.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    

    /*lấy dữ liệu từ component con UserInputLogin  về component cha FormForgotPassword */
    callbackFunction = (field, id) => {
        
        if (id == "Email") {
            this.setState({ emailLogin: field });
            this.sendData(field);
        }
        
    }

    /*send data from FormLogin to LoginScreen*/
    sendData = (emailLogin) => {
        this.props.parentCallback(emailLogin);
    }

    render() {
        return (
            <View style={styles.container}>
                <UserInputLogin
                    source={usernameImg}
                    placeholder="Email"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    parentCallback={this.callbackFunction}
                />
                
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
    },
    
});

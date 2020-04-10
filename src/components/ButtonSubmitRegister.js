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
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';


export default class ButtonSubmitRegister extends Component {
    constructor() {
        super();
        this.state = {

        };
        this.registerAccount = this.registerAccount.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
    }

    validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    }

    submit = (emailSub, passwordSub, navigation) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailSub, passwordSub)
                .then(user => {
                    console.log(user);
                });
            console.log('Resgister Successfull !!!');
            navigation.navigate("LoginScreen");
        } catch (error) {
            console.log(error.toString(error));
        }
    }

    registerAccount = (emailSub, passwordSub, usernameSub, navigation) => {
        if (usernameSub.length == 0) {
            Alert.alert(
                'Error',
                'Username is empty',
            );
        }
        else if (this.validate(emailSub) == false) {
            Alert.alert(
                'Error',
                'Email is not true',
            )
        }
        else if (passwordSub.length < 6 && passwordSub.length >= 0 || passwordSub.length >= 32) {
            Alert.alert(
                'Error',
                'Password length must be between 6 and 32 characters',
            );
        }
        else {
            this.submit(emailSub, passwordSub, navigation);
        }
    }

    render() {
        const { TextButton, emailSub, passwordSub, usernameSub, navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.registerAccount(emailSub, passwordSub, usernameSub, navigation)}
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
        alignItems: 'flex-start',
        marginLeft: 0.07 * DEVICE_WIDTH,
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
    },

});

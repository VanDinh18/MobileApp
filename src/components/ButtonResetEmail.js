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
import '@react-native-firebase/database';

export default class ButtonResetEmail extends Component {
    constructor() {
        super();
        this.state = {
            userExist: [],
        };
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }
    componentDidMount() {
        firebase.database().ref('/users').on("value", snapshot => {
            this.setState({ userExist: Object.values(snapshot.val()) });
        });
    }

    validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    }
    

    submit = async (emailSub, navigation) => {
        console.log(emailSub + ' reset password')
        try {
            await firebase
                .auth()
                .sendPasswordResetEmail(emailSub)
                .then(() => {
                    console.log('Reset password link has been sent to your email account !');
                    navigation.navigate("LoginScreen");
                })
                .catch((error) => {
                    Alert.alert('Error')
                });
        } catch (error) {
            console.log(error.toString(error));
        }
    }
    resetPassword = (emailSub, navigation) => {
        if (this.validate(emailSub) == false) {
            Alert.alert(
                emailSub
            )
        }
        else {
            Alert.alert('Reset password link has been sent to your email account !')
            this.submit(emailSub, navigation);
        }
    }

    render() {
        const {TextButton, emailSub, navigation} = this.props;
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.resetPassword(emailSub,navigation)}
                >
                    <Text style={styles.text}>{TextButton}</Text>
                </TouchableOpacity>

            </View>
        )
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

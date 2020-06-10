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

export default class ButtonChangePassword extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    validate = (currentpassword, newpassword) => {
        if (currentpassword.length < 6 || currentpassword.length > 32) {
            Alert.alert(
                'Error',
                'CurrentPassword length must be between 6 and 32 characters',
            );
            return false;
        }
        if (newpassword.length < 6 || newpassword.length > 32) {
            Alert.alert(
                'Error',
                'NewPassword length must be between 6 and 32 characters',
            );
            return false;
        }
        return true;
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    changePassword = (currentPassword, newPassword, navigation) => {
        if (this.validate(currentPassword, newPassword)) {
            this.reauthenticate(currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    Alert.alert(
                        'Password updated!',
                    );
                    navigation.navigate('LoginScreen');
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                if (error.code == "auth/wrong-password") {
                    Alert.alert(
                        'Error',
                        'CurrentPassword is wrong',
                    )
                }
            });
        }
    }
    render() {
        const { TextButton, password, newpassword, navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.changePassword(password, newpassword, navigation)}>
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

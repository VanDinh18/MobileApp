import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,

} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import User from '../../components/User';

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.submitUriImage = this.submitUriImage.bind(this);
    }

    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('LoginScreen');
    }

    submitUriImage() {
        console.log(this.state.text);
        if(this.state.text.length > 8){
            firebase.database().ref('users/' + User.username).set({
                avatar: this.state.text,
                username: User.username,
                email: User.email,
            });
        }
      
    }

    handleText = (text) => {
        this.setState({ text: text });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Image
                        />
                    </View>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity
                        style={{ height: 50, width: 100 }}
                        onPress={this.logout}
                    >
                        <Text style={{ fontSize: 30 }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder='input'
                        onChangeText={this.handleText}
                        value={this.state.text}
                    />
                    <TouchableOpacity
                        onPress={() => this.submitUriImage()}
                        style={{ borderWidth: 1, borderColor: 'green', backgroundColor: 'green' }}
                    >
                        <Text>Submit Uri Image</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 11,
    },
    input: {
        height: 50,
        width: 0.8 * DEVICE_WIDTH,
        borderWidth: 1,
    }
})

export default SettingsScreen;
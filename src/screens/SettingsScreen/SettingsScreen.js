import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

class SettingsScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    logout = async ()=>{
        await AsyncStorage.clear;
        this.props.navigation.navigate('LoginScreen');
    }
    render(){
        return (
            <View>
                <Text>SettingsScreen</Text>
                <TouchableOpacity
                    style={{height: 50, width: 100}}
                    onPress={this.logout}
                >
                <Text style={{fontSize: 30}}>
                    Logout
                </Text>
            </TouchableOpacity>
            </View>
          
        );
    }
}

export default SettingsScreen;
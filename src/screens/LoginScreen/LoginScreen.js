import { Component } from "react";
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,

} from 'react-native';

class LoginScreen extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Text style={{fontSize: 30}}>Login</Text>
            </View>
        )
    }

}

export default LoginScreen;

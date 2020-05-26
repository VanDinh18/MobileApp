import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class CallScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.gotoVideoCall = this.gotoVideoCall.bind(this);
    }
    gotoVideoCall() {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View>
                <Text>CallScreen</Text>
                <TouchableOpacity
                    style={{ height: 50, width: 100, backgroundColor: 'red' }}
                    onPress={() => this.gotoVideoCall()}>
                    <Text>go to video call</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CallScreen;
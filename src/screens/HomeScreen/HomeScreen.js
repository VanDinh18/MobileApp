import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ChatSettingScreen')}
                >
                    <Text>HomeScreen</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
export default HomeScreen;
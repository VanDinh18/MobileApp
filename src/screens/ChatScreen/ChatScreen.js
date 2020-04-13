import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        
    }


    sendMessage =() =>{
        
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text>Name conversation</Text>
                </View>
                <View style={styles.listMessage}>
                    <Text>Listmessage</Text>
                </View>
                <View style={styles.wrapperInputMessage}>
                    <TextInput 
                        style={styles.inputMessage}
                        placeholder='Your message' 
                    />
                    <TouchableOpacity
                        onPress={this.sendMessage}
                    >
                        <Text style={{fontSize: 30}}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        justifyContent: 'space-between'
    },
    header: {
        height: 30,

    },
    listMessage: {

    },
    wrapperInputMessage: {

    },
    inputMessage: {

    }
});

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

export default class Search extends Component{
    render(){
        return(
            <View >
                    <Image source={require('../assets/images/search.png')} style={styles.inlineImg} />
                    <TextInput
                    style={styles.input}
                    placeholder='Tìm kiếm'
                    // secureTextEntry={this.props.secureTextEntry}
                    // autoCorrect={this.props.autoCorrect}
                    // autoCapitalize={this.props.autoCapitalize}
                    // returnKeyType={this.props.returnKeyType}
                    placeholderTextColor="gray"
                    // underlineColorAndroid="transparent"
                    // onChangeText={
                    //     (text) => {this.sendData(text) }
                    // }
                    // value="Tìm kiếm"
                    />
            </View>
        )
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: 0.86 * DEVICE_WIDTH,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: 'black',
    },
    inputWrapper: {
        flex: 1,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
})
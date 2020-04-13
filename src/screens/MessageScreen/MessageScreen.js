import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import Search from '../../components/Search';

class MessageScreen extends Component{

    gotoMessage = ()=>{
        this.props.navigation.navigate('ChatScreen');
    }
    
    render(){
        return (
            <View>
                <View style={styles.wrapperSearch}>
                    <Search/>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={this.gotoMessage}
                    >
                        <Text style={{fontSize: 30}}>
                            Conversation1
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
    wrapperSearch: {
        width: DEVICE_WIDTH,
        // height: 40,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#5a94f2',
    }
})

export default MessageScreen;
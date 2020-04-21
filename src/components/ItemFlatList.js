import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';

class ItemFlatList extends Component {
    constructor(props){
        super(props);
        this.state={

        };
        this.gotoMessage = this.gotoMessage.bind(this);
    }

    gotoMessage =(navigation, title)=>{
        navigation.navigate('ChatScreen', {name: title});
    }

    render() {
        const { title, navigation, image, } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.gotoMessage(navigation, title)}
                >
                    <View style={styles.avatar}>

                    </View>
                    <Text style={styles.title}>
                        {title}
                    </Text>
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
        flexDirection: 'row',
        height: DEVICE_HEIGHT/12,
        justifyContent: 'center'
    },
    avatar: {
        flex: 1,
        backgroundColor: 'gray'
    },
    title: {
        flex: 4,
        fontSize: 30,
        
    }
})
export default ItemFlatList;
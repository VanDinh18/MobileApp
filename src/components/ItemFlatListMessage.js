import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import User from './User';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ItemFlatListMessage extends Component {

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + '-' + d.getMonth() + ' ' + result;
        }
        return result;
    }
    render() {
        const { item } = this.props;
        return (
            <View
                style={{
                    flexDirection: 'column',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: '#d9d9d9',
                    alignSelf: item.from === User.username ? 'flex-end' : 'flex-start',
                    backgroundColor: item.from === User.username ? '#cce6ff' : 'white',
                    marginTop: 8,
                    marginRight: item.from === User.username ? 8 : 0,
                    marginLeft: item.from !== User.username ? 8 : 0,
                    maxWidth: DEVICE_WIDTH * 0.8,
                }}>
                <View style={{
                    marginLeft: 8,
                    marginRight: 8,
                    marginTop: 5,
                    marginBottom: 5,
                }}>
                    <Text style={{ fontSize: 16 }}>{item.message}</Text>
                    <Text style={{ fontSize: 10, color: '#8c8c8c' }}>{this.convertTime(item.time)}</Text>
                </View>
            </View>
        )
    }

}
export default ItemFlatListMessage;
import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import User from './User';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ItemFlatListMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                checkimage: this.props.item.checkimage,
                message: this.props.item.message,
                from: this.props.item.from,
                time: this.props.item.time,
            }
        }
    }
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
    componentDidMount() {
        if (this.state.item.checkimage == 1) {
            Image.getSize(this.state.item.message, (width, height) => {
                this.setState({
                    width: DEVICE_WIDTH * 0.7,
                    height: Math.ceil(DEVICE_WIDTH * 0.7 * height / width) - 1,
                })
            });
        }
    }
    render() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: '#d9d9d9',
                    alignSelf: this.state.item.from === User.username ? 'flex-end' : 'flex-start',
                    backgroundColor: this.state.item.from === User.username ? '#cce6ff' : 'white',
                    marginTop: 8,
                    marginRight: this.state.item.from === User.username ? 8 : 0,
                    marginLeft: this.state.item.from !== User.username ? 8 : 0,
                    maxWidth: DEVICE_WIDTH * 0.8,
                }}>
                {this.state.item.checkimage == 1
                    ?
                    <View>
                        <Image
                            style={{ height: this.state.height, width: this.state.width, borderRadius: 10 }}
                            source={this.state.item.message ? { uri: this.state.item.message } : null} />
                    </View>
                    :
                    <View style={{
                        marginLeft: 8,
                        marginRight: 8,
                        marginTop: 5,
                        marginBottom: 5,
                    }}>
                        <Text style={{ fontSize: 16 }}>{this.state.item.message}</Text>
                        <Text style={{ fontSize: 10, color: '#8c8c8c' }}>{this.convertTime(this.state.item.time)}</Text>
                    </View>
                }

            </View>
        )
    }

}
export default ItemFlatListMessage;
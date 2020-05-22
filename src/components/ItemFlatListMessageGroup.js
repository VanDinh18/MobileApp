import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from './User';
import avatar from '../assets/images/avatar.jpg';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ItemFlatListMessageGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                checkimage: this.props.item.checkimage,
                message: this.props.item.message,
                from: this.props.item.from,
                time: this.props.item.time,
            },
            index: this.props.index,
            Data: this.props.Data,
            show: true,
            height: 0,
            width: 0,
        };
    }
    _isMounted = false;
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
    show() {
        var index = this.state.index;
        var Data = this.state.Data;
        for (var i = 1; i < Data.length; i++) {
            if (index == i && Data[i - 1].from == Data[i].from) {
                this.setState({ show: !this.state.show });
                break;
            }
        }
    }
    getAvatar() {
        if (this.state.item.from !== User.username) {
            return new Promise((resolve, reject) => {
                const Root = firebase.database().ref('users').child(this.state.item.from);
                Root.once('value', function (value) {
                    resolve(value.val().avatar);
                });
            })
        }
    }
    componentDidMount = async () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.show();
            const data = await this.getAvatar();
            this.setState({
                avatar: data,
            });
            if (this.state.item.checkimage == 1) {
                Image.getSize(this.state.item.message, (width, height) => {
                    this.setState({
                        width: DEVICE_WIDTH * 0.7,
                        height: Math.ceil(DEVICE_WIDTH * 0.7 * height / width) - 1,
                    })
                });
            }
        }
    }
    //con fix bug tiep
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { item } = this.props;
        return (
            <View style={{
                flexDirection: 'row',
                alignSelf: item.from === User.username ? 'flex-end' : 'flex-start',
                marginTop: 8,
                marginLeft: item.from === User.username ? 0 : 8,
                marginRight: item.from === User.username ? 8 : 0,
            }}>
                <View style={{ justifyContent: 'flex-start', marginRight: 8 }}>
                    {(this.state.item.from !== User.username) && (this.state.show == true)
                        ?
                        <Image
                            style={{ height: 30, width: 30, borderRadius: 50 }}
                            source={this.state.avatar ? { uri: this.state.avatar } : null} />
                        :
                        <Image
                            style={{ height: 30, width: 30, borderRadius: 50, tintColor: '#f2f2f2' }} />
                    }
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: '#d9d9d9',
                        backgroundColor: item.from === User.username ? '#cce6ff' : 'white',
                        maxWidth: DEVICE_WIDTH * 0.7,
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
                            <Text style={{ fontSize: 10, color: '#8c8c8c' }}>{this.convertTime(item.time)}</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
}
export default ItemFlatListMessageGroup;
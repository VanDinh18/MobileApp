import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import avatarImg from '../assets/images/avatar.jpg';

class ItemFlatListFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            avatarImg: '',
        };
        this.gotoMessage = this.gotoMessage.bind(this);
    }

    gotoMessage(navigation) {
        navigation.navigate('ChatScreen', { name: this.state.title, avatar: this.state.avatarImg });
    }

    async componentDidMount() {
        const avt = firebase.database().ref('/users/' + this.state.title);
        await avt.once('value', (snapshot) => {
            this.setState({ avatarImg: snapshot.val().avatar });
        });
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.gotoMessage(navigation)}
                >
                    <View style={styles.avatar}>
                        <Image
                            style={{ height: 50, width: 50, borderRadius: 50 }}
                            source={this.state.avatarImg ? { uri: this.state.avatarImg } : null}
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={{ flex: 1, textAlignVertical: 'bottom', fontSize: 18, fontWeight: "900" }}>
                            {this.state.title}
                        </Text>
                        <Text style={{ flex: 1, textAlignVertical: 'top', fontSize: 14, fontWeight: '100', color: '#b3b3b3' }}>
                            Last Message
                        </Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={{ fontSize: 14, color: '#b3b3b3' }}>11:12</Text>
                    </View>
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
        height: DEVICE_HEIGHT / 10,
    },
    avatar: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 3.8,
        borderBottomWidth: 1,
        borderBottomColor: '#b3b3b3',
    },
    time: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#b3b3b3',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default ItemFlatListFriend;
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import goback from '../../assets/images/goback.png';
import chatsetting from '../../assets/images/chatsetting.png';

class ChatSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.state.params.name,
                avatar: props.navigation.state.params.avatar,
            },
        }
        this.goback = this.goback.bind(this);
    }

    goback(navigation) {
        navigation.navigate('ChatScreen', { name: this.state.person.name, avatar: this.state.person.avatar });
    }

    componentDidMount() {

    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.goback(navigation)}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={goback}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 5,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}
                    >
                        <Text style={{ fontSize: 20, color: 'white' }}>Tùy chọn</Text>
                    </View>
                    <View
                        style={{
                            flex: 1, justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{ height: 30, width: 30, tintColor: 'white' }}
                            source={chatsetting}
                        />
                    </View>
                </View>

                <View style={styles.body}>
                    <ScrollView>
                        <View style={styles.avatar}>
                            <Image
                                style={{ height: 100, width: 100, borderRadius: 50, marginBottom: 10 }}
                                source={this.state.person.avatar ? { uri: this.state.person.avatar } : null}
                            />
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.state.person.name}</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity
                                style={{ height: DEVICE_HEIGHT / 12 }}
                            >
                                <Text>Thay đổi hình nền</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: DEVICE_HEIGHT / 12 }}
                            >
                                <Text>Tìm kiếm trong cuộc trò chuyện</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: DEVICE_HEIGHT / 12 }}
                            >
                                <Text>abc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: DEVICE_HEIGHT / 12 }}
                            >
                                <Text>abc</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#66b3ff',
    },
    body: {
        flex: 11,
        flexDirection: 'column',
    },
    avatar: {
        height: DEVICE_HEIGHT / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {

    }
})

export default ChatSettingScreen;
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import done from '../../assets/images/done.png';
import goback from '../../assets/images/goback.png';
import chatsetting from '../../assets/images/chatsetting.png';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

class MultiChatSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {
                chatkey: props.navigation.state.params.chatkey,
                members: props.navigation.state.params.members,
                groupname: props.navigation.state.params.groupname,
                groupavatar: props.navigation.state.params.groupavatar,
                content: props.navigation.state.params.content,
            },
            show: false,
            groupname: '',
        };
        this.goback = this.goback.bind(this);
        this.gotoAddFriendScreen = this.gotoAddFriendScreen.bind(this);
    }

    goback(navigation) {
        navigation.navigate(
            'MultiChatScreen',
            {
                chatkey: this.state.group.chatkey,
                members: this.state.group.members,
                groupname: this.state.group.groupname,
                groupavatar: this.state.group.groupavatar,
                content: this.state.group.content,
            }
        )
    }
    gotoAddFriendScreen(navigation) {
        navigation.navigate(
            'AddFriendToGroupExistScreen',
            {
                chatkey: this.state.group.chatkey,
                members: this.state.group.members,
                groupname: this.state.group.groupname,
                groupavatar: this.state.group.groupavatar,
                content: this.state.group.content,
            }
        )
    }
    handleText = key => val => {
        this.setState({ [key]: val })
    }
    changeGroupname = async () => {
        var groupnameUD = this.state.groupname.trim();
        var members = this.state.group.members;
        var chatkey = this.state.group.chatkey;
        if (groupnameUD.length > 0) {
            members.forEach(function (item) {
                var Root = firebase.database().ref('groups').child(item).child(chatkey);
                Root.update({
                    groupname: groupnameUD,
                })
            })
            this.setState({
                show: false,
                groupname: '',
            })
            this.props.navigation.navigate('GroupScreen');
        }
        else {
            this.setState({
                show: false,
            })
        }
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
                        }}>
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={goback} />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 5,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Tùy chọn</Text>
                    </View>
                    <View
                        style={{
                            flex: 1, justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Image
                            style={{ height: 24, width: 24, tintColor: 'white' }}
                            source={chatsetting} />
                    </View>
                </View>

                <View style={styles.body}>
                    <ScrollView>
                        <View style={styles.avatar}>
                            <Image
                                style={{ height: 100, width: 100, borderRadius: 50, marginBottom: 10 }}
                                source={this.state.group.groupavatar ? { uri: this.state.group.groupavatar } : null}
                            />
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.state.group.groupname}</Text>
                        </View>
                        <View style={styles.option}>
                            <View style={{ height: DEVICE_HEIGHT / 12, flex: 1, flexDirection: 'column' }}>
                                {!this.state.show
                                    ?
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            style={{ flex: 1, justifyContent: 'center' }}
                                            onPress={() => this.setState({ show: true })}>
                                            <Text style={{ fontSize: 16, marginLeft: 10 }}>Thay đổi tên nhóm</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                                }
                                {this.state.show
                                    ?
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                        <TextInput
                                            style={{ width: DEVICE_WIDTH / 2 }}
                                            underlineColorAndroid='#428AF8'
                                            selectionColor='#428AF8'
                                            placeholder={this.state.group.groupname}
                                            onChangeText={this.handleText('groupname')}
                                            value={this.state.groupname}
                                        />
                                        <TouchableOpacity
                                            onPress={() => this.changeGroupname()}
                                            style={{ marginLeft: 10 }}>
                                            <Image
                                                style={{ height: 20, width: 20, tintColor: '#428AF8' }}
                                                source={done} />
                                        </TouchableOpacity>
                                    </View>
                                    : null
                                }
                            </View>

                            <TouchableOpacity
                                style={{ height: DEVICE_HEIGHT / 12, flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 7, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Thay đổi hình nền</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 20, height: 20 }}
                                        source={goback} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ height: DEVICE_HEIGHT / 12, flex: 1, flexDirection: 'row' }}
                                onPress={() => this.gotoAddFriendScreen(navigation)}>
                                <View style={{ flex: 7, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Thêm bạn bè vào nhóm</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 20, height: 20 }}
                                        source={goback} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ height: DEVICE_HEIGHT / 12, flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 7, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Tìm kiếm trong cuộc trò chuyện</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 20, height: 20 }}
                                        source={goback} />
                                </View>
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
export default MultiChatSettingScreen;
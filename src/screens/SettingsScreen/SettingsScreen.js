import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    Alert,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import { imagePickerOptions, uploadFileToFireBase } from '../../utils';
import ImagePicker from 'react-native-image-picker';
import info from '../../assets/images/info.png';
import logout from '../../assets/images/logout.png';
import user_switch from '../../assets/images/user_switch.png';
import done from '../../assets/images/done.png';

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                avatar: '',
                coverimage: '',
            },
            alluser: [],
            show: false,
            username: '',
        };
    }
    _isMounted = false;
    monitorFileUpload = (uploadTask, target) => {
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                const Root = firebase.database().ref('users').child(User.username);
                if (target == 'coverimage') {
                    Root.update({
                        coverimage: downloadURL,
                    })
                }
                else if (target == 'avatar') {
                    Root.update({
                        avatar: downloadURL,
                    })
                }
                else {
                    console.log('loi roi');
                }
            });
        });

    };
    uploadFile = (target) => {
        ImagePicker.launchImageLibrary(imagePickerOptions, response => {
            if (response.didCancel) {
                Alert.alert('Hủy đăng ảnh');
            } else if (response.error) {
                Alert.alert('Đã xảy ra lỗi: ', response.error);
            } else {
                const uploadTask = uploadFileToFireBase(response);
                this.monitorFileUpload(uploadTask, target);
            }
        }
        );
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('LoginScreen');
    }
    checkUserExist() {
        var username = this.state.username.trim();
        var alluser = Object.values(this.state.alluser);
        for (var i = 0; i < alluser.length; i++) {
            if (username == alluser[i].username) {
                return false;
            }
        }
        return true;
    }
    changeUsername = () => {
        var username = this.state.username.trim();
        if (username.length > 6 && username.length < 32) {
            if (this.checkUserExist() == true) {
                this.setState({
                    show: false,
                    username: '',
                });
            }
            else {
                Alert.alert('Tên người dùng đã tồn tại');
            }
        }
        else {
            Alert.alert('Tên người dùng từ 6 đến 32 ký tự');
        }
    }
    handleText = key => val => {
        this.setState({ [key]: val })
    }
    getUser = () => {
        return new Promise((resolve, reject) => {
            const Root = firebase.database().ref('users').child(User.username);
            Root.on('value', snapshot => {
                var data = snapshot.val();
                resolve(data);
            })
        })
    }
    getAllUser = () => {
        return new Promise((resolve, reject) => {
            const Root = firebase.database().ref('users');
            Root.on('value', snapshot => {
                var data = snapshot.val();
                resolve(data);
            })
        })
    }
    componentDidMount = async () => {
        this._isMounted = true;
        if (this._isMounted) {
            const user = await this.getUser();
            const alluser = await this.getAllUser();
            this.setState({
                user: {
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar,
                    coverimage: user.coverimage,
                },
                alluser: alluser,
            })
        }

    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ position: 'absolute', zIndex: 1 }}
                        onPress={() => this.uploadFile('coverimage')}>
                        <Image
                            style={{ height: DEVICE_HEIGHT / 4, width: DEVICE_WIDTH }}
                            source={this.state.user.coverimage ? { uri: this.state.user.coverimage } : null} />
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', zIndex: 2, top: DEVICE_HEIGHT / 4 - DEVICE_WIDTH / 8, flexDirection: 'column', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.uploadFile('avatar')}>
                            <Image
                                style={{ height: DEVICE_WIDTH / 4, width: DEVICE_WIDTH / 4, borderRadius: DEVICE_WIDTH / 8, borderWidth: 2, borderColor: 'white' }}
                                source={this.state.user.avatar ? { uri: this.state.user.avatar } : null} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {this.state.user.username}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={{ height: DEVICE_HEIGHT / 12 }}>
                        {!this.state.show
                            ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ flex: 1, flexDirection: 'row' }}
                                    onPress={() => this.setState({ show: true })}>
                                    <View style={{ flex: 7, marginLeft: 10, justifyContent: 'center', borderBottomColor: '#b3b3b3', borderBottomWidth: 1 }}>
                                        <Text style={{ fontSize: 16 }}>Thay đổi tên người dùng</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 20, width: 20, tintColor: '#99ffff'}}
                                            source={user_switch} />
                                    </View>
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
                                    placeholder={this.state.user.username}
                                    onChangeText={this.handleText('username')}
                                    value={this.state.username}
                                />
                                <TouchableOpacity
                                    onPress={() => this.changeUsername()}
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
                        style={{ height: DEVICE_HEIGHT / 12, flexDirection: 'column', justifyContent: 'center' }}
                        onPress={() => this.changeUsername()}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 7, justifyContent: 'center', marginLeft: 10, borderBottomColor: '#b3b3b3', borderBottomWidth: 1 }}>
                                <Text style={{ fontSize: 16 }}>Thông tin ứng dụng</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 20, width: 20, tintColor: '#4dff4d'}}
                                    source={info} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ height: DEVICE_HEIGHT / 12, flexDirection: 'column', justifyContent: 'center' }}
                        onPress={this.logout}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 7, justifyContent: 'center', marginLeft: 10, borderBottomColor: '#b3b3b3', borderBottomWidth: 1 }}>
                                <Text style={{ fontSize: 16 }}>Đăng xuất</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 20, width: 20, tintColor: '#9999ff'}}
                                    source={logout} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
        flexDirection: 'column',
        alignItems: 'center'
    },
    body: {
        flex: 1.2,
    },
    input: {
        height: 50,
        width: 0.8 * DEVICE_WIDTH,
        borderWidth: 1,
    }
})

export default SettingsScreen;
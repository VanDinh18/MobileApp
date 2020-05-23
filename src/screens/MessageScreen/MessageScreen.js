import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    FlatList,
    SafeAreaView,
    Image,
    TextInput,
} from 'react-native';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import ItemFlatListFriend from '../../components/ItemFlatListFriend';
import ItemFlatListFriendisSelected from '../../components/ItemFlatListFriendisSelected';

import search from '../../assets/images/search.png';
import deleteImg from '../../assets/images/delete.png';

class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSearch: '',
            userInFriendList: [],
            alluser: [],
            searchData: [],
            searching: false,
        };
        this.filterSearch = this.filterSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }
    _isMounted = false;
    filterSearch(text) {
        this.setState({ valueSearch: text });
        if (text.length > 0) {
            this.setState({ searching: true });
        }
        else {
            this.setState({ searching: false });
        }
        const newData = this.state.alluser.filter(function (item) {
            const itemData = item.title.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .toUpperCase()
                .trim();
            const textData = text.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .toUpperCase()
                .trim();
            return itemData.indexOf(textData) > -1
        });
        this.setState({ searchData: newData });
    }
    closeSearch() {
        this.setState({
            searching: false,
            valueSearch: '',
        });
    }
    getAllUser = () => {
        return new Promise((resolve, reject) => {
            var i = 0;
            var array = [];
            const Root = firebase.database().ref('users')
            Root.on('value', function (snapshot) {
                snapshot.forEach(function (childs) {
                    var item = {
                        id: i,
                        title: childs.key,
                        content: childs.val(),
                    };
                    array.push(item);
                    i++;
                })
                resolve(array);
            })
        })
    }
    getUserInFriendList = () => {
        return new Promise((resolve, reject) => {
            var i = 0;
            var array = [];
            const Root = firebase.database().ref('messages').child(User.username);
            Root.on('value', function (snapshot) {
                snapshot.forEach(function (childs) {
                    var item = {
                        id: i,
                        title: childs.key,
                        content: childs.val(),
                    };
                    array.push(item);
                    i++;
                })
                resolve(array);
            })
        })
    }
    componentDidMount = async () => {
        this._isMounted = true;
        if (this._isMounted) {
            const alluser = await this.getAllUser();
            const userInFriendList = await this.getUserInFriendList();
            userInFriendList.forEach(item => {
                item.content = Object.values(item.content).sort(function (a, b) {
                    return a.time - b.time;
                })
            });
            userInFriendList.sort(function (a, b) {
                var length_a = Object.values(a.content).length;
                var length_b = Object.values(b.content).length;
                return Object.values(b.content)[length_b - 1].time - Object.values(a.content)[length_a - 1].time
            });
            this.setState({
                userInFriendList: userInFriendList,
                alluser: alluser,
            })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.wrapperSearch}>
                    <Image
                        style={styles.imageSearch}
                        source={search} />
                    <TextInput
                        style={styles.input}
                        placeholder='Tìm kiếm nhóm'
                        onChangeText={(text) => this.filterSearch(text)}
                        value={this.state.valueSearch} />
                    <TouchableOpacity
                        style={styles.wrapperDelete}
                        onPress={() => this.closeSearch()}>
                        <Image
                            style={styles.imageDelete}
                            source={deleteImg} />
                    </TouchableOpacity>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.searching ? this.state.searchData : this.state.userInFriendList}
                        renderItem={
                            this.state.searching
                                ?
                                ({ item }) => (
                                    <ItemFlatListFriendisSelected
                                        title={item.title}
                                        navigation={this.props.navigation}
                                        alluser={this.state.alluser} />
                                )
                                :
                                ({ item }) => (
                                    <ItemFlatListFriend
                                        title={item.title}
                                        content={item.content}
                                        navigation={this.props.navigation} />
                                )
                        }
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    wrapperSearch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5a94f2',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: 0.9 * DEVICE_WIDTH,
        height: 0.06 * DEVICE_HEIGHT,
        paddingLeft: 0.1 * DEVICE_WIDTH,
        paddingTop: 0.015 * DEVICE_HEIGHT,
        borderRadius: 20,
        zIndex: 0,
        position: 'absolute',
    },
    imageSearch: {
        position: 'absolute',
        zIndex: 1,
        width: 0.06 * DEVICE_WIDTH,
        height: 0.06 * DEVICE_WIDTH,
        left: 0.08 * DEVICE_WIDTH,
        top: 0.025 * DEVICE_HEIGHT,
    },
    wrapperDelete: {
        zIndex: 2,
        position: 'absolute',
        right: 0.08 * DEVICE_WIDTH,
        top: 0.025 * DEVICE_HEIGHT,
    },
    imageDelete: {
        width: 0.06 * DEVICE_WIDTH,
        height: 0.06 * DEVICE_WIDTH,
    },
    list: {
        flex: 10,
    },
})

export default MessageScreen;
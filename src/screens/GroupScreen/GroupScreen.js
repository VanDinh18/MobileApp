import React, { Component, useReducer } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    FlatList,
    Image,
} from 'react-native';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import addfriend from '../../assets/images/addfriend.png';
import ItemFlatListGroup from '../../components/ItemFlatListGroup';
import ItemFlatListGroupisSelected from '../../components/ItemFlatListGroupisSelected';
import search from '../../assets/images/search.png';
import deleteImg from '../../assets/images/delete.png';

class GroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSearch: '',
            DATA: [],
            searchData: [],
            searching: false,
        };
        this.gotoCreateNewGroup = this.gotoCreateNewGroup.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }
    _isMounted = false;
    gotoCreateNewGroup() {
        this.props.navigation.navigate(
            'AddFriendToGroupScreen',
            {
                DATA: this.state.DATA,
            }
        );
    }
    filterSearch(text) {
        this.setState({ valueSearch: text });
        if (text.length > 0) {
            this.setState({ searching: true });
        }
        else {
            this.setState({ searching: false });
        }
        const newData = this.state.DATA.filter(function (item) {
            const itemData = item.groupname.normalize("NFD")
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
    componentDidMount = async () => {
        var arr = [];
        var arr2 = [];
        var i = 0;
        var Root = null;
        this._isMounted = true;
        if (this._isMounted) {
            Root = firebase.database().ref('groups').child(User.username);
            await Root.once('value', function (snapshot) {
                snapshot.forEach(function (childs) {
                    var item = {
                        id: i,
                        key: childs.key,
                        groupavatar: childs.val().groupavatar,
                        groupname: childs.val().groupname,
                        members: childs.val().members,
                        content: childs.val().content,
                        creationtime: childs.val().creationtime,
                    };
                    arr.push(item);
                    i++;
                })
            });

            //sắp xếp danh sách group theo thời gian nhắn tin gần nhất
            arr.forEach(function (item) {
                if (typeof item.content !== 'undefined') {
                    item.content = Object.values(item.content).sort(function (a, b) {
                        return a.time - b.time;
                    })
                }
            })
            arr.sort(function (a, b) {
                if (typeof a.content !== 'undefined' && typeof b.content !== 'undefined') {
                    var length_a = Object.values(a.content).length;
                    var length_b = Object.values(b.content).length;
                    return -Object.values(a.content)[length_a - 1].time + Object.values(b.content)[length_b - 1].time;
                }
                else if (typeof a.content === 'undefined' && typeof b.content !== 'undefined') {
                    var length_b = Object.values(b.content).length;
                    return -a.creationtime + Object.values(b.content)[length_b - 1].time;
                }
                else if (typeof a.content !== 'undefined' && typeof b.content === 'undefined') {
                    var length_a = Object.values(a.content).length;
                    return -Object.values(a.content)[length_a - 1].time + b.creationtime;
                }
                else {
                    return -a.creationtime + b.creationtime;
                }
            })
            this.setState({ DATA: arr });
        }
        else {
            Root.off('value');
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                        data={this.state.searching ? this.state.searchData : this.state.DATA}
                        renderItem={
                            this.state.searching ?
                                ({ item }) => (
                                    <ItemFlatListGroupisSelected
                                        chatkey={item.key}
                                        groupname={item.groupname}
                                        groupavatar={item.groupavatar}
                                        members={item.members}
                                        content={item.content}
                                        navigation={this.props.navigation} />)
                                :
                                ({ item }) => (
                                    <ItemFlatListGroup
                                        chatkey={item.key}
                                        groupname={item.groupname}
                                        groupavatar={item.groupavatar}
                                        members={item.members}
                                        content={item.content}
                                        creationtime={item.creationtime}
                                        navigation={this.props.navigation} />)}
                        keyExtractor={(item) => item.id.toString()} />
                    <TouchableOpacity
                        onPress={() => this.gotoCreateNewGroup()}
                        style={{ alignSelf: 'flex-end', marginRight: 30, marginBottom: 30 }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={addfriend} />
                    </TouchableOpacity>
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
        height: 60,
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
    }
})
export default GroupScreen;
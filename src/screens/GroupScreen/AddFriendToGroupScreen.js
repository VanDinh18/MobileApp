import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    FlatList,
    StyleSheet,
    Dimensions,
    Image,
    Alert,
} from 'react-native';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import goback from '../../assets/images/goback.png';
import complete from '../../assets/images/complete.png';
import photography from '../../assets/images/photography.webp';
import search from '../../assets/images/search.png';

class AddFriendToGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupname: '',
            friend: '',
            Data: [],
            searchData: [],
            isSelected: [],
            avatar: '',
            isFocusedGroupname: false,
            isFocusedSearchBar: false,
            show: false,
            group: props.navigation.state.params.DATA,
        }
        this.submit = this.submit.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
        this.selectMembers = this.selectMembers.bind(this);
        this.deleteMembers = this.deleteMembers.bind(this);
    }
    handleText = key => val => {
        this.setState({ [key]: val })
    }
    async submit() {
        var members = [];
        var isSelected = this.state.isSelected;
        var groupname = this.state.groupname.trim();
        isSelected.forEach(function (item) {
            members.push(item.title);
        });
        members.push(User.username);

        if (this.validateMembers(members) && this.validateGroupname(groupname)) {
            firebase.database().ref('groups/').child(User.username).push({
                groupname: groupname,
                members: members,
                groupavatar: 'https://imgur.com/VkvLI8R.png',
                creationtime: firebase.database.ServerValue.TIMESTAMP,
            });
            var Root = firebase.database().ref('groups/').child(User.username);
            var key = '';
            await Root.once('value', function (snapshot) {
                snapshot.forEach(function (childs) {
                    if (childs.val().groupname == groupname) {
                        key = childs.key;
                    }
                })
            });
            for (var i = 0; i < members.length - 1; i++) {
                firebase.database().ref('groups/').child(members[i]).child(key).set({
                    groupname: groupname,
                    members: members,
                    groupavatar: 'https://imgur.com/VkvLI8R.png',
                    creationtime: firebase.database.ServerValue.TIMESTAMP,
                });
            }
            this.props.navigation.navigate('GroupScreen');
        }
        else
            console.log('error add friend to group');
    }
    validateGroupname(groupname) {
        if (groupname == '') {
            Alert.alert("Bạn chưa đặt tên nhóm");
            return false;
        }
        var group = this.state.group;
        for (var i = 0; i < group.length; i++) {
            if (group[i].groupname == groupname) {
                Alert.alert("Tên nhóm đã tồn tại trong danh sách nhóm của bạn")
                return false;
            }
        }
        return true;
    }
    validateMembers(members) {
        if (members.length <= 2) {
            Alert.alert("Nhóm có 3 thành viên trở lên");
            return false;
        }
        return true;
    }
    filterSearch(text) {
        this.setState({ friend: text });
        const newData = this.state.Data.filter(function (item) {
            const itemData = item.title.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        })
        this.setState({ searchData: newData })
    }

    deleteMembers(item) {
        this.setState((prevState) => {
            return {
                Data: [...prevState.Data, item],
                searchData: [...prevState.searchData, item]
            }
        });
        this.setState({
            isSelected: this.state.isSelected.filter(e => e.id != item.id)
        });
        console.log(this.state.isSelected.length);
        if (this.state.isSelected.length <= 1) {
            this.setState({ show: false });
        }
    }
    selectMembers(item) {
        this.setState((prevState) => {
            return {
                isSelected: [...prevState.isSelected, item]
            }
        });
        if (this.state.isSelected.length >= 0) {
            this.setState({ show: true });
        }
        this.setState({
            Data: this.state.Data.filter(e => e.id != item.id)
        });
        this.setState({
            searchData: this.state.searchData.filter(e => e.id != item.id)
        });
    }

    handleFocus = event => {
        this.setState({ isFocusedGroupname: true });
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }
    handleBlur = event => {
        this.setState({ isFocusedGroupname: false });
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }
    handleFocusSearchBar = event => {
        this.setState({ isFocusedSearchBar: true });
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }
    handleBlurSearchBar = event => {
        this.setState({ isFocusedSearchBar: false });
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }
    async componentDidMount() {
        try {
            var arr1 = [];
            var i = 0;
            var Root = firebase.database().ref('messages').child(User.username);
            await Root.once("value").then(snapshot => {
                snapshot.forEach((childs => {
                    let a = {
                        id: i,
                        title: childs.key,
                    };
                    arr1.push(a);
                    i++;
                }))
            });
            var arr2 = [];
            arr1.forEach(item => {
                var Root = firebase.database().ref("users").child(item.title);
                Root.once("value", value => {
                    let b = {
                        id: item.id,
                        title: item.title,
                        avatar: value.val().avatar,
                    }
                    arr2.push(b);
                })
            })
            this.setState({ Data: arr2, searchData: arr2 });
        }
        catch (error) {
            console.error(error);
        }
    }
    componentWillUnmount() {

    }
    render() {
        const { onFocus, onBlur, ...otherProps } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.props.navigation.navigate('GroupScreen')}>
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={goback}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 5 }}>
                    </View>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.submit()}>
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={complete} />
                    </TouchableOpacity>
                </View>
                <View style={styles.groupname}>
                    <TouchableOpacity
                        style={styles.buttonGroupname}>
                        <View style={[
                            { height: 60, width: 60, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
                            this.state.isFocusedGroupname ? { backgroundColor: '#cce6ff' } : { backgroundColor: '#f2f2f2' }
                        ]}>
                            <Image
                                style={{ height: 40, width: 40 }}
                                source={photography} />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.txtGroupname}
                        placeholder='Đặt tên nhóm'
                        selectionColor='#428AF8'
                        underlineColorAndroid={this.state.isFocusedGroupname ? '#428AF8' : '#D3D3D3'}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChangeText={this.handleText('groupname')}
                        value={this.state.groupname} />
                </View>

                {this.state.show ?
                    <View style={styles.listFriendIsSelected}>
                        <FlatList
                            data={this.state.isSelected}
                            renderItem={({ item }) => (
                                <View style={{ width: DEVICE_WIDTH / 5, marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.deleteMembers(item)}
                                        style={{ alignItems: 'center', flex: 1, flexDirection: 'column' }} >
                                        <Image
                                            style={{ height: 38, width: 38, borderRadius: 50 }}
                                            source={item.avatar ? { uri: item.avatar } : null} />
                                        <Text>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true} />
                    </View>
                    : null}
                <View style={styles.searchBar}>
                    <Image
                        source={search}
                        style={[
                            {
                                position: 'absolute',
                                zIndex: 99,
                                width: 22,
                                height: 22,
                                left: 10,
                                bottom: 15,
                            },
                            this.state.isFocusedSearchBar ? { tintColor: '#428AF8' } : { tintColor: '#D3D3D3' },
                        ]} />
                    <TextInput
                        style={{ marginLeft: 10, marginRight: 10, paddingLeft: 30 }}
                        placeholder='Tìm kiếm bạn bè'
                        selectionColor='#428AF8'
                        underlineColorAndroid={
                            this.state.isFocusedSearchBar ? '#428AF8' : '#D3D3D3'
                        }
                        onFocus={this.handleFocusSearchBar}
                        onBlur={this.handleBlurSearchBar}
                        onChangeText={(text) => this.filterSearch(text)}
                        value={this.state.friend}
                    />
                </View>
                <View style={styles.listFriendWillSelect}>
                    <FlatList
                        data={this.state.searchData}
                        renderItem={({ item }) => (
                            <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.selectMembers(item)}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <Image
                                        style={{ height: 38, width: 38, borderRadius: 50 }}
                                        source={item.avatar ? { uri: item.avatar } : null} />
                                    <Text style={{ marginLeft: 10, fontSize: 14 }}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()} />
                </View>
            </SafeAreaView>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        // flex: 1,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#66b3ff',
    },
    groupname: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    },
    listFriendIsSelected: {
        flex: 1.2,
        flexDirection: 'row',
        backgroundColor: '#cce6ff'
    },
    searchBar: {
        // flex: 1,
        height: 50,
        justifyContent: 'flex-end',
    },
    listFriendWillSelect: {
        flex: 7.6,
    },
    buttonGroupname: { 
        width: 60,
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    txtGroupname: {
        flex: 1,
    }
})
export default AddFriendToGroupScreen;
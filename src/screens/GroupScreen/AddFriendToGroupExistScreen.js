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

class AddFriendToGroupExistScreen extends Component {
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
            isFocusedSearchBar: false,
            show: false,
            friend: '',
            Data: [],
            searchData: [],
            isSelected: [],
        };
        this.goback = this.goback.bind(this);
        this.submit = this.submit.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
        this.selectMembers = this.selectMembers.bind(this);
        this.deleteMembers = this.deleteMembers.bind(this);
    }
    goback() {
        this.props.navigation.navigate(
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
    async submit() {
        var content = this.state.group.content;
        var groupavatar = this.state.group.groupavatar;
        var groupname = this.state.group.groupname;
        var old_members = this.state.group.members;
        var new_members = old_members;
        var chatkey = this.state.group.chatkey
        var isSelected = this.state.isSelected;
        if(isSelected.length != 0){
            isSelected.forEach(function (item) {
                new_members.push(item.title);
            });
            old_members.forEach(function (item) {
                var Root1 = firebase.database().ref('groups').child(item).child(chatkey);
                Root1.update({
                    members: new_members
                })
            });
            isSelected.forEach(function (item) {
                var Root2 = firebase.database().ref('groups').child(item.title).child(chatkey);
                if (typeof content === 'undefined') {
                    Root2.set({
                        groupavatar: groupavatar,
                        groupname: groupname,
                        members: new_members,
                    })
                }
                else {
                    Root2.set({
                        content: content,
                        groupavatar: groupavatar,
                        groupname: groupname,
                        members: new_members,
                    })
                }
            });
            this.props.navigation.navigate('GroupScreen');
        }
        else{
            Alert.alert('Bạn chưa thêm ai vào nhóm')
        }
        
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
            //xóa thành viên đã có trong nhóm khỏi danh sách tìm kiếm
            var members = this.state.group.members;
            for (var k = 0; k < members.length; k++) {
                arr1 = arr1.filter(function (obj) {
                    return obj.title !== members[k];
                })
            }
            //thêm avatar của thành viên trong nhóm
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
    render() {
        const { onFocus, onBlur, ...otherProps } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.goback()}>
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={goback} />
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
                    : null
                }

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
                        value={this.state.friend} />
                </View>
                <View style={styles.listFriendWillSelect}>
                    <FlatList
                        data={this.state.searchData}
                        renderItem={({ item }) => (
                            <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.selectMembers(item)}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    groupname: {
        flex: 1.2,
        flexDirection: 'row',
    },
    listFriendIsSelected: {
        flex: 1.2,
        flexDirection: 'row',
        backgroundColor: '#cce6ff'
    },
    searchBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    listFriendWillSelect: {
        flex: 7.6,
    }
});

export default AddFriendToGroupExistScreen;
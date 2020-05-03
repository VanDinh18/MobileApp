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
} from 'react-native';
import Search from '../../components/Search';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import ItemFlatListFriend from '../../components/ItemFlatListFriend';

class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.searchResult = []
        this.listContact = []
        this.isFetching = false
        this.state = {
            DATA: [],
            searchResult: [],
            searching: false,
            isFetching: false
        }
    }

    async componentDidMount() {
        try{
            await this.loadUser();
        }catch(err) {console.log('err: ' + err)}
    }

    clickUserSearched(username, avatarImg) {
        this.props.navigation.navigate('ChatScreen', { name: username, avatar: avatarImg });
    }

    closeSearch() {
        this.setState({ searching: false })
    }

    onRefresh() {
        this.loadUser();
    }

    searching(text) {
        if(text == ""){
            this.setState({searching: false})
            return;
        }
        let self = this
        self.searchResult = []
        return new Promise((resolve, reject) => {
            firebase.database().ref('/users').orderByChild("username").startAt(text).endAt(text + "\uf8ff").once('value', snapshot => {
                if(snapshot.val() == null){
                    self.searchResult.push({id: "-1", notfound: true});
                }else{
                    let i = 0;
                    Object.values(snapshot.val()).forEach(function (user) {
                        var item = {
                            id: i,
                            avatar: user["avatar"],
                            email: user["email"],
                            username: user["username"]
                        };
                        self.searchResult.push(item);
                        i++;
                    })
                }
                self.setState({ searching: true })
                resolve();
            })
        })
    }

    async loadUser(){
        var arr = [];
        var i = 0;
        var message_firebase = firebase.database().ref('messages');
        var newRoot = message_firebase.child(User.username);
        await newRoot.once('value', function (snapshot) {
            snapshot.forEach(function (childs) {
                var item = {
                    id: i,
                    title: childs.key,
                };
                arr.push(item);
                i++;
            })
        })
        this.isFetching = false
        this.setState({ DATA: arr });
    }




    renderUser(user) {
        if (this.state.searching && user["item"]["notfound"]) {
            return (
                <Text style={{fontSize: 20, margin: 10}}>Không tìm thấy</Text>
            )
        }else if (this.state.searching) {
            return (
                <TouchableOpacity onPress={this.clickUserSearched.bind(this, user["item"]["username"], user["item"]["avatar"])}>
                    <Text style={styles.userBasic}>{user["item"]["username"]}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <ItemFlatListFriend
                title={user["item"]["title"]}
                navigation={this.props.navigation}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapperSearch}>
                    <Search searchingCb={this.searching.bind(this)} closeSearch={this.closeSearch.bind(this)} />
                </View>
                <SafeAreaView style={styles.list}>
                    <FlatList
                        data={this.state.searching ? this.searchResult : this.state.DATA}
                        renderItem={this.renderUser.bind(this)}
                        keyExtractor={(item) => item.id.toString()}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.isFetching}
                    />
                </SafeAreaView>
            </View>
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
        width: DEVICE_WIDTH,
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 10,
        backgroundColor: '#5a94f2',
    },
    list: {
        flex: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    userBasic: {
        fontSize: 20,
        margin: 10,
    }
})

export default MessageScreen;
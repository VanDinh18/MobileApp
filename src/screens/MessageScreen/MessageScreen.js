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

var message_firebase = firebase.database().ref('messages');

class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DATA: [],
            searchResult: [],
            searching: false,
            isFetching: false
        }
    }

    async componentDidMount() {
        this.loadUser();
    }

    clickUserSearched(){

    }

    searching(searchResult){
        this.setState({ searching: true, searchResult: searchResult})
    }

    closeSearch(){
        this.setState({searching: false})
    }

    onRefresh(){
        this.loadUser();    
    }

    async loadUser(){
        var arr = [];
        var i = 0;
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
        this.setState({ DATA: arr, isFetching: false });
    }

    renderSearchResult() {
        return (
            <View>
                <Text style={styles.title}>Kết quả tìm kiếm</Text>
                <FlatList
                        data={this.state.searchResult}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={this.clickUserSearched()}>
                                <Text style={{fontSize:17, marginLeft: 10, marginBottom: 5}}>{item.username}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.email}
                    />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapperSearch}>
                    <Search searchingCb={this.searching.bind(this)} closeSearch={this.closeSearch.bind(this)}/>
                </View>
                <SafeAreaView style={styles.list}>
                    {this.state.searching ? this.renderSearchResult() : null}
                    <Text style={styles.title}>Tin nhắn</Text>
                    <FlatList
                        data={this.state.DATA}
                        renderItem={({ item }) => (
                            <ItemFlatListFriend
                                title={item.title}
                                navigation={this.props.navigation}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
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
    }
})

export default MessageScreen;
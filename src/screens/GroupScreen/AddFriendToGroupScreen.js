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
} from 'react-native';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import goback from '../../assets/images/goback.png';
import complete from '../../assets/images/complete.png';
import photography from '../../assets/images/photography.png';

class AddFriendToGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peple1: '',
            peple2: '',
            peple3: '',
            groupname: '',
            friend: '',
            Data: [],
            searchData: [],
            isSelected: [],
        }
        this.submit = this.submit.bind(this);
        this.filterSearch = this.filterSearch.bind(this);
        this.selectMembers = this.selectMembers.bind(this);

    }
    handleText = key => val => {
        this.setState({ [key]: val })
    }
    async submit() {
        var members = [];
        var isSelected = this.state.isSelected;
        var groupname = this.state.groupname;
        isSelected.forEach(function(item){
            members.push(item.title);
        });
        members.push(User.username);

        if (members.length >= 2 && groupname !== '') {
            firebase.database().ref('groups/').child(User.username).push({
                groupname: this.state.groupname,
                members: members,
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
            for(var i=0; i<members.length -1; i++){
                firebase.database().ref('groups/').child(members[i]).child(key).set({
                    groupname: groupname,
                    members: members,
                });
            }
        }
        else
             console.log('error');
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

    selectMembers(item) {
        this.setState((prevState) => {
            return {
                isSelected: [...prevState.isSelected, item]
            }
        });
        this.setState({
            Data: this.state.Data.filter(e => e.id != item.id)
        });
        this.setState({
            searchData: this.state.searchData.filter(e => e.id != item.id)
        });
    }

    async componentDidMount() {
        var arr = [];
        var i = 0;
        var Root = firebase.database().ref('messages').child(User.username);
        await Root.once('value', function (snapshot) {
            snapshot.forEach(function (childs) {
                var item = {
                    id: i,
                    title: childs.key,
                };
                arr.push(item);
                i++;
            })
        });
        this.setState({ Data: arr, searchData: arr });
    }
    render() {
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
                            source={complete}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.groupname}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 60, width: 60, borderRadius: 50, backgroundColor: '#d9d9d9' ,justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ height: 40, width: 40 }}
                                source={photography} />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        style={{ flex: 4, borderWidth: 1 }}
                        placeholder='groupname'
                        onChangeText={this.handleText('groupname')}
                        value={this.state.groupname}/>
                </View>
                <View style={styles.listFriendIsSelected}>
                    <FlatList
                        data={this.state.isSelected}
                        renderItem={({ item }) => (
                            <View>
                                <Text>
                                    {item.title}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()} />
                </View>

                <View style={styles.searchBar}>
                    <TextInput
                        placeholder='search your friends'
                        onChangeText={(text) => this.filterSearch(text)}
                        value={this.state.friend}
                    />
                </View>

                <View style={styles.listFriendWillSelect}>
                    <FlatList
                        data={this.state.searchData}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.selectMembers(item)}
                                >
                                    <Text>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#66b3ff',
    },
    groupname: {
        flex: 1.5,
        flexDirection: 'row',
    },
    listFriendIsSelected: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'gray'
    },
    searchBar: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: 'pink'
    },
    listFriendWillSelect: {
        flex: 7.5,
    }

})
export default AddFriendToGroupScreen;
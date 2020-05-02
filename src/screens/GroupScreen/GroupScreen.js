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

import ItemFlatListGroup from '../../components/ItemFlatListGroup';


class GroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            DATA: [],
        };
        this.gotoCreateNewGroup = this.gotoCreateNewGroup.bind(this);
    }

    gotoCreateNewGroup() {
        this.props.navigation.navigate('AddFriendToGroupScreen');
    }

    async componentDidMount() {
        var arr = [];
        var i = 0;
        var Root = firebase.database().ref('groups').child(User.username);
        await Root.once('value', function (snapshot) {
            snapshot.forEach(function (childs) {
                var item = {
                    id: i,
                    key: childs.key,
                    groupname: childs.val().groupname,
                    members: childs.val().members,
                    content: childs.val().content,
                };
                arr.push(item);
                i++;
            })
        });
        this.setState({ DATA: arr });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapperSearch}>
                    
                </View>
                <View style={styles.addGroup}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#e6e6e6',
                        }}
                        onPress={() => this.gotoCreateNewGroup()}
                    >
                        <Image
                            style={{ height: 50, width: 50, tintColor: '#1a8cff' }}
                            source={require('../../assets/images/channel-add.png')}
                        />
                        <Text style={{fontSize: 20,}}>Tạo nhóm mới</Text>
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.list}>
                    <FlatList
                        data={this.state.DATA}
                        renderItem={({ item }) => (
                            <ItemFlatListGroup
                                chatkey={item.key}
                                groupname={item.groupname}
                                members={item.members}
                                content={item.content}
                                navigation={this.props.navigation}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
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
    },
    wrapperSearch: {
        flex: 1,
        width: DEVICE_WIDTH,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#5a94f2',
    },
    addGroup: {
        flex: 2,
    },
    list: {
        flex: 13,
    }
})
export default GroupScreen;
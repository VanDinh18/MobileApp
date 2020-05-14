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
            }
        };
        this.goback = this.goback.bind(this);
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
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={goback}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 5 }}>
                    </View>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image
                            style={{ height: 20, width: 20, tintColor: 'white' }}
                            source={complete} />
                    </TouchableOpacity>
                </View>
                <View style={styles.groupname}></View>
                <View style={styles.listFriendIsSelected}>

                </View>
                <View style={styles.searchBar}>
                   
                </View>
                <View style={styles.listFriendWillSelect}>
                   
                </View>
            </SafeAreaView>
        )
    }
}

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
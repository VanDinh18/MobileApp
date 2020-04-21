import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    FlatList,
    SafeAreaView
} from 'react-native';
import Search from '../../components/Search';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';
import ItemFlatList from '../../components/ItemFlatList';

class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DATA: [],
        }
    }




    async componentDidMount() {
        var arr = [];
        var i = 0;
        var rootRef = firebase.database().ref('messages');
        var newRoot = rootRef.child(User.username);
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
        this.setState({ DATA: arr });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapperSearch}>
                    <Search />
                </View>
                <SafeAreaView style={styles.list}>
                    <FlatList
                        data={this.state.DATA}
                        renderItem={({ item }) => (
                            <ItemFlatList
                                title={item.title}
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
        flexDirection: 'column',
    },
    wrapperSearch: {
        flex: 1,
        width: DEVICE_WIDTH,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#5a94f2',
    },
    list: {
        flex: 15,
    }
})

export default MessageScreen;
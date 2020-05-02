import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import firebase from '@react-native-firebase/app';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSearch: ''
        }
    }

    searchFromFirebase(text) {
        let self = this
        firebase.database().ref('/users').orderByChild("username").startAt(text).endAt(text + "\uf8ff").once('value', snapshot => {
            self.props.searchingCb(Object.values(snapshot.val()));
        })
        this.setState({
            valueSearch:text
        })
    }

    clickCloseSearch(){
        this.props.closeSearch();
        this.setState({
            valueSearch:''
        })
    }

    render() {
        return (
            <View>
                <Image source={require('../assets/images/search.png')} style={styles.imageSearch} />
                <TextInput
                    style={styles.input}
                    placeholder='Tìm kiếm'
                    placeholderTextColor="gray"
                    value={this.state.valueSearch}
                    onChangeText={
                        (text) => { this.searchFromFirebase(text) }
                    }
                />
                <TouchableOpacity onPress={this.clickCloseSearch.bind(this)} style={styles.wrapperDelete}>
                    <Image source={require('../assets/images/delete.png')} style={styles.imageDelete}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: 0.86 * DEVICE_WIDTH,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: 'black',
    },
    inputWrapper: {
        flex: 1,
    },
    imageSearch: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: DEVICE_WIDTH * 0.1,
        top: 9,
    },
    wrapperDelete:{
        position: 'absolute',
        width: 22,
        height: 22,
        right: DEVICE_WIDTH * 0.12,
        top: 9,
    },
    imageDelete: {
        width: 22,
        height: 22,
    }
})
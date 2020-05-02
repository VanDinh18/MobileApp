import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import User from '../../components/User';

class AddFriendToGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peple1: '',
            peple2: '',
            peple3: '',
            groupname: '',
        }
        this.submit = this.submit.bind(this);
    }
    handleText = key => val => {
        this.setState({ [key]: val })
    }
    async submit() {
        if (this.state.peple1.length > 0 && this.state.peple2.length > 0 && this.state.peple3.length > 0 && this.state.groupname.length > 0) {
            firebase.database().ref('groups/').child(this.state.peple1).push({
                groupname: this.state.groupname,
                members: [this.state.peple1, this.state.peple2, this.state.peple3],
            });
            var Root = firebase.database().ref('groups/').child(this.state.peple1);
            var groupname = this.state.groupname; 
            var key = '';
            await Root.once('value', function(snapshot){
                snapshot.forEach(function(childs){
                    if(childs.val().groupname == groupname){
                        key = childs.key;
                    }
                })
            });
            firebase.database().ref('groups/').child(this.state.peple2).child(key).set({
                groupname: this.state.groupname,
                members: [this.state.peple1, this.state.peple2, this.state.peple3],
            });
            firebase.database().ref('groups/').child(this.state.peple3).child(key).set({
                groupname: this.state.groupname,
                members: [this.state.peple1, this.state.peple2, this.state.peple3],
            });
        }
        else
            console.log('error');
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{ width: 100, height: 50, backgroundColor: 'green' }}
                    onPress={() => this.props.navigation.navigate('GroupScreen')}
                >
                    <Text>go back GroupScreen</Text>
                </TouchableOpacity>
                <TextInput
                    style={{ borderWidth: 1, width: 100, height: 50 }}
                    placeholder='peple1'
                    onChangeText={this.handleText('peple1')}
                    value={this.state.peple1}
                />
                <TextInput
                    style={{ borderWidth: 1, width: 100, height: 50 }}
                    placeholder='peple2'
                    onChangeText={this.handleText('peple2')}
                    value={this.state.peple2}
                />
                <TextInput
                    style={{ borderWidth: 1, width: 100, height: 50 }}
                    placeholder='peple3'
                    onChangeText={this.handleText('peple3')}
                    value={this.state.peple3}
                />
                <TextInput
                    style={{ borderWidth: 1, width: 100, height: 50 }}
                    placeholder='groupname'
                    onChangeText={this.handleText('groupname')}
                    value={this.state.groupname}
                />
                <TouchableOpacity
                    style={{ width: 100, height: 50, backgroundColor: 'green' }}
                    onPress={() => this.submit()}
                >
                    <Text>submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default AddFriendToGroupScreen;
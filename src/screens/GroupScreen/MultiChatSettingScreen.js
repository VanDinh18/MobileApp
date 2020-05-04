import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';



class MultiChatSettingScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            group: {
                chatkey: props.navigation.state.params.chatkey,
                members: props.navigation.state.params.members,
                groupname: props.navigation.state.params.groupname,
                content: props.navigation.state.params.content,
            }
        };
        this.goback = this.goback.bind(this);
    }

    goback(navigation){
        navigation.navigate(
            'MultiChatScreen',
            {
                chatkey: this.state.group.chatkey,
                members: this.state.group.members,
                groupname: this.state.group.groupname,
                content: this.state.group.content,
            }
        )
    }
    render(){
        const {navigation} = this.props;
        return(
            <View>
                <TouchableOpacity
                    onPress={()=> this.goback(navigation)}
                >
                    <Text>gobach</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MultiChatSettingScreen;
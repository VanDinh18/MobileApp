import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

class ItemFlatListGroupisSelected extends Component {
    constructor(props) {
        super(props);
        this.gotoMultiChatScreen = this.gotoMultiChatScreen.bind(this);
    }
    gotoMultiChatScreen(navigation, chatkey, members, groupname, groupavatar, content) {
        navigation.navigate(
            'MultiChatScreen',
            {
                chatkey: chatkey,
                members: members,
                groupname: groupname,
                groupavatar: groupavatar,
                content: content
            }
        );
    }
    render() {
        const { chatkey, groupname, groupavatar, members, content, navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 15}}
                    onPress={() => this.gotoMultiChatScreen(navigation, chatkey, members, groupname, groupavatar, content)}>
                    <Image
                        style={{ height: 40, width: 40, borderRadius: 50 }}
                        source={groupavatar ? { uri: groupavatar } : null} />
                    <Text style={{fontSize: 16, marginLeft: 10}}>{groupname}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
export default ItemFlatListGroupisSelected;


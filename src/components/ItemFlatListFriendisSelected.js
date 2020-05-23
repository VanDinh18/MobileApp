import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

class ItemFlatListFriendisSelected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            alluser: this.props.alluser,
            avatarImg: '',
        };
    }
    gotoMessage(navigation) {
        navigation.navigate('ChatScreen', { name: this.state.title, avatar: this.state.avatarImg });
    }
    componentDidMount() {
        var alluser = this.state.alluser;
        var title = this.state.title;
        alluser.forEach(item => {
            if (item.title == title) {
                this.setState({ avatarImg: item.content.avatar });
            }
        })
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.gotoMessage(navigation)}
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20 }}>
                    <Image
                        style={{ height: DEVICE_WIDTH / 10, width: DEVICE_WIDTH / 10, borderRadius: DEVICE_WIDTH / 20 }}
                        source={this.state.avatarImg ? { uri: this.state.avatarImg } : null}
                    />
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>{this.state.title}</Text>
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
export default ItemFlatListFriendisSelected;


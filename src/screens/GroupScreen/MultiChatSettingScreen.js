import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';
import {imagePickerOptions, uploadFileToFireBase} from '../../utils';

import done from '../../assets/images/done.png';
import goback from '../../assets/images/goback.png';
import chatsetting from '../../assets/images/chatsetting.png';
import change_groupname_icon from '../../assets/images/change_groupname_icon.png';
import change_background_group_icon from '../../assets/images/change_background_group_icon.png';
import add_friend_group_exist from '../../assets/images/add_friend_group_exist.png';

class MultiChatSettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {
        chatkey: props.navigation.state.params.chatkey,
        members: props.navigation.state.params.members,
        groupname: props.navigation.state.params.groupname,
        groupavatar: props.navigation.state.params.groupavatar,
        content: props.navigation.state.params.content,
      },
      data: null,
      show: false,
      show2: false,
      groupname: '',
    };
    this.goback = this.goback.bind(this);
    this.gotoAddFriendScreen = this.gotoAddFriendScreen.bind(this);
  }

  goback(navigation) {
    navigation.navigate('MultiChatScreen', {
      chatkey: this.state.group.chatkey,
      members: this.state.group.members,
      groupname: this.state.group.groupname,
      groupavatar: this.state.group.groupavatar,
      content: this.state.group.content,
    });
  }
  gotoAddFriendScreen(navigation) {
    navigation.navigate('AddFriendToGroupExistScreen', {
      chatkey: this.state.group.chatkey,
      members: this.state.group.members,
      groupname: this.state.group.groupname,
      groupavatar: this.state.group.groupavatar,
      content: this.state.group.content,
    });
  }
  handleText = key => val => {
    this.setState({[key]: val});
  };
  changeGroupname = async () => {
    var groupnameUD = this.state.groupname.trim();
    var members = this.state.group.members;
    var chatkey = this.state.group.chatkey;
    if (groupnameUD.length > 0) {
      members.forEach(function(item) {
        var Root = firebase
          .database()
          .ref('groups')
          .child(item)
          .child(chatkey);
        Root.update({
          groupname: groupnameUD,
        });
      });
      this.setState({
        show: false,
        groupname: '',
      });
      this.props.navigation.navigate('GroupScreen');
    } else {
      this.setState({
        show: false,
      });
    }
  };
  monitorFileUpload = (uploadTask, navigation) => {
    var chatkey = this.state.group.chatkey;
    var members = this.state.group.members;
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      function(error) {},
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log(downloadURL);
          const Root = firebase.database().ref('groups');
          for (var i = 0; i < members.length; i++) {
            Root.child(members[i])
              .child(chatkey)
              .update({
                groupavatar: downloadURL,
              });
          }
          navigation.navigate('GroupScreen');
        });
      },
    );
  };
  uploadFile = navigation => {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
      if (response.didCancel) {
        Alert.alert('Hủy đăng ảnh');
      } else if (response.error) {
        Alert.alert('Đã xảy ra lỗi: ', response.error);
      } else {
        const uploadTask = uploadFileToFireBase(response);
        this.monitorFileUpload(uploadTask, navigation);
      }
    });
  };

  renderMembers = () => {};
  componentDidMount() {
    const Root = firebase.database().ref('users');
    var members = this.state.group.members;
    var i = 0;
    var data = [];
    members.forEach(item => {
      Root.child(item).once('value', value => {
        let e = {
          id: i,
          username: value.val().username,
          coverimage: value.val().coverimage,
          avatar: value.val().avatar,
        };
        i++;
        data.push(e);
      });
    });
    this.setState({
      data: data,
    });
  }
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.goback(navigation)}
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 20, width: 20, tintColor: 'white'}}
              source={goback}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>Tùy chọn</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 24, width: 24, tintColor: 'white'}}
              source={chatsetting}
            />
          </View>
        </View>

        <View style={styles.body}>
          <ScrollView>
            <View style={styles.avatar}>
              <TouchableOpacity onPress={() => this.uploadFile(navigation)}>
                <Image
                  style={{
                    height: DEVICE_WIDTH / 4,
                    width: DEVICE_WIDTH / 4,
                    borderRadius: DEVICE_WIDTH / 8,
                    marginBottom: 10,
                  }}
                  source={
                    this.state.group.groupavatar
                      ? {uri: this.state.group.groupavatar}
                      : null
                  }
                />
              </TouchableOpacity>
              <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 10}}>
                {this.state.group.groupname}
              </Text>
            </View>
            {/* OPTION */}
            <View style={styles.option}>
              <View
                style={{
                  height: DEVICE_HEIGHT / 12,
                  flex: 1,
                  flexDirection: 'column',
                }}>
                {!this.state.show2 ? (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}
                      onPress={() => this.setState({show2: true})}>
                      <View style={{flex: 7, justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, marginLeft: 20}}>
                          Xem thành viên ({this.state.group.members.length})
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 20, height: 20}}
                          source={change_background_group_icon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <FlatList
                      data={this.state.data}
                      renderItem={({item}) => (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginRight: 20,
                          }}>
                          <Image
                            style={{
                              height: DEVICE_WIDTH / 10,
                              width: DEVICE_WIDTH / 10,
                              borderRadius: DEVICE_WIDTH / 20,
                            }}
                            source={item.avatar ? {uri: item.avatar} : null}
                          />
                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            {item.username}
                          </Text>
                        </View>
                      )}
                      keyExtractor={item => item.id.toString()}
                      horizontal={true}
                    />
                  </View>
                )}
              </View>
              <View
                style={{
                  height: DEVICE_HEIGHT / 12,
                  flex: 1,
                  flexDirection: 'column',
                }}>
                {!this.state.show ? (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}
                      onPress={() => this.setState({show: true})}>
                      <View style={{flex: 7, justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, marginLeft: 20}}>
                          Thay đổi tên nhóm
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 20, height: 20}}
                          source={change_groupname_icon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {this.state.show ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <TextInput
                      style={{width: DEVICE_WIDTH / 2, flex: 1}}
                      underlineColorAndroid="#428AF8"
                      selectionColor="#428AF8"
                      placeholder={this.state.group.groupname}
                      onChangeText={this.handleText('groupname')}
                      value={this.state.groupname}
                    />
                    <TouchableOpacity
                      onPress={() => this.changeGroupname()}
                      style={{marginLeft: 20}}>
                      <Image
                        style={{height: 20, width: 20, marginRight: 20, tintColor: '#428AF8'}}
                        source={done}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>

              <TouchableOpacity
                style={{
                  height: DEVICE_HEIGHT / 12,
                  flex: 1,
                  flexDirection: 'row',
                }}
                onPress={() => this.gotoAddFriendScreen(navigation)}>
                <View style={{flex: 7, justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, marginLeft: 20}}>
                    Thêm bạn bè vào nhóm
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={add_friend_group_exist}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#66b3ff',
  },
  body: {
    flex: 11,
    flexDirection: 'column',
  },
  avatar: {
    height: DEVICE_HEIGHT / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {},
});
export default MultiChatSettingScreen;

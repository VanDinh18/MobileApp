import React, {Component} from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import bgSrc from '../assets/images/wallpaper.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
});

export default Wallpaper;

import React, { Component } from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
import bgSrc from '../assets/images/wallpaper.png'



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
        resizeMode: 'cover'
    },
});

export default Wallpaper;
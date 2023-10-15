import { Text, View, StyleSheet, ImageBackground } from "react-native";
import React from "react";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.backGround}
        source={require("../../Resource/Image/welcome.png")}>
        <Text style={styles.text}>Welcome to </Text>
        <Text style={styles.text1}>TrustyBuy</Text>
      </ImageBackground>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backGround: {
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "white",
    fontSize: 25,
    position: "absolute",
    bottom: 80, left: 20, fontWeight: "400",

  },
  text1: {
    color: "white",
    fontSize: 25,
    position: "absolute",
    bottom: 50, left: 20, 
    fontFamily:"sans-serif-condensed",
    fontWeight:"bold"

  }
})
export default Welcome;
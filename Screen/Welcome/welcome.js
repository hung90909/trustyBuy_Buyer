import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const nav = useNavigation();

  const redirectToWelcome1 = () => {
    nav.replace('Welcome1');
  };

  setTimeout(redirectToWelcome1, 3000);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.backGround}
        source={{ uri: 'https://image.hsv-tech.io/reebok/common/65af6c7b-ea50-49f9-8db6-09943edd6047.webp' }}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.text1}>TrustyBuy</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backGround: {
    flex: 1,
    resizeMode: 'contain',
    paddingHorizontal: 20,
    resizeMode: 'contain'
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 130,
    left: 10,

  },
  text1: {
    color: 'black',
    fontSize: 44,
    position: 'absolute',
    bottom: 80,
    left: 5,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
  },
});

export default Welcome;
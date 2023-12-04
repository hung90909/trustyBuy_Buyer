import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const nav = useNavigation();

  const redirectToLogin = () => {
    nav.replace('Login2');
  };

  setTimeout(redirectToLogin, 3000);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Resource/Image/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: '50%',
    width: '50%',
  },
});

export default Welcome;

import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
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
    height: '50%', // Đặt kích thước theo chiều cao của màn hình
    aspectRatio: 1, // Giữ tỉ lệ khung hình của hình ảnh
    maxWidth: '50%', // Đặt chiều rộng tối đa
  },
});

export default Welcome;

import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Login_API} from '../../config/urls';
import axios from 'axios';
import {setItem} from '../../utils/utils';

const Welcome = () => {
  const nav = useNavigation();

  const redirectToLogin = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      if (email && password) {
        const response = await axios.post(Login_API, {
          email,
          password,
          role: 'User',
        });

        const accessToken = response.data.message;
        // console.log(response.data);

        if (accessToken) {
          // Save the token before navigating
          await setItem('token', accessToken);
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
          nav.replace('Main');
        } else {
          // Handle the case where the token is not available
          console.error('Access token not received from the server');
        }
      } else {
        nav.replace('Login2');
      }
    } catch (error) {
      // Handle any error that occurred in the try block
      console.error('Error in redirectToLogin:', error);
    }
  };

  setTimeout(redirectToLogin, 3000);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Resource/Image/logo.jpeg')}
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

import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {checkEmail, checkPassword} from '../../compoment/checkValidate';
import {Login_API} from '../../config/urls';
import {setItem} from '../../utils/utils';
import axios from 'axios';

const Login2 = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigation();

  const checkValidateLogin = async () => {
    try {
      setErrorEmail('');
      setErrorPassword('');

      const isValidEmail = checkEmail(email);

      if (email.length === 0 || password.length === 0) {
        setErrorEmail('*Vui lòng nhập đầy đủ thông tin');
        setErrorPassword('*Vui lòng nhập đầy đủ thông tin');
      } else if (!isValidEmail) {
        setErrorEmail('*Email không đúng định dạng');
      }

      const isValidPassword = checkPassword(password);
      if (!isValidPassword) {
        setErrorPassword('*Password phải có ít nhất 6 ký tự');
      }

      if (!isValidEmail || !isValidPassword) {
        return;
      }

      const response = await axios.post(Login_API, {
        email,
        password,
        role: 'User',
      });

      const accessToken = response.data.message;
      if (accessToken) {
        // Save the token before navigating
        await setItem('token', accessToken);
        nav.replace('Main');
      } else {
        // Handle the case where the token is not available
        console.error('Access token not received from the server');
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        if (error.response.status === 403) {
          setErrorPassword('Mật khẩu không chính xác');
        } else {
          console.error('Server error:', error.response.data);
        }
      } else if (error.request) {
        console.error('No response from server');
      } else {
        console.error('Error during request setup:', error.message);
      }

      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../Resource/Image/logo.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>Đăng nhập</Text>
      </View>
      <View style={styles.textInput}>
        <Fontisto name="email" size={25} color={'black'} />
        <TextInput
          onChangeText={text => {
            setEmail(text);
            setErrorEmail('');
          }}
          style={styles.input}
          placeholder="Email"
        />
      </View>
      {errorEmail !== '' && <Text style={styles.errorText}>{errorEmail}</Text>}
      <View style={styles.textInput}>
        <SimpleLineIcons name="lock" size={25} />
        <TextInput
          onChangeText={text => {
            setPassword(text);
            setErrorPassword('');
          }}
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {errorPassword !== '' && (
        <Text style={styles.errorText}>{errorPassword}</Text>
      )}
      <TouchableOpacity onPress={checkValidateLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.line}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Hoặc</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialButtons}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 60,
                borderColor: 'blue',
                paddingVertical: 6,
                borderRadius: 5,
              }}
              onPress={() =>
                Alert.alert('Thông báo', 'Chức năng đang phát triển')
              }>
              <Image
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../Resource/icon/facebook.png')}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontSize: 14,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                  color: 'blue',
                }}>
                Đăng nhập với Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.notAcount}>
          <Text>Chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate('Register');
            }}>
            <Text style={styles.registerLink}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  heading: {
    marginVertical: 20,
    alignSelf: 'center',
    fontSize: 30,
    color: 'black',
    fontWeight: '800',
  },
  textInput: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  input: {
    marginStart: 10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginStart: 15,
  },
  passwordInput: {
    marginStart: 10,
    flex: 1,
    width: '100%',
  },
  passwordToggle: {
    position: 'absolute',
    right: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '30%',
    backgroundColor: '#D9D9D9',
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  socialButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  socialButton: {
    width: 80,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonSpacer: {
    width: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  notAcount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerLink: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Login2;

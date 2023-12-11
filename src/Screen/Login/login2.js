import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {checkEmail, checkPassword} from '../../compoment/checkValidate';
import {Login_API} from '../../config/urls';
import {setItem} from '../../utils/utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const {width, height} = Dimensions.get('window');

const Login2 = ({navigation}) => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

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

      setButtonDisabled(true);
      const response = await axios.post(Login_API, {
        email,
        password,
        role: 'User',
      });

      const accessToken = response.data.message;
      if (accessToken) {
        // Save the token before navigating
        await setItem('token', accessToken);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        setButtonDisabled(false);
        navigation.replace('Main');
      } else {
        setButtonDisabled(false);
        // Handle the case where the token is not available
        console.error('Access token not received from the server');
      }
    } catch (error) {
      setButtonDisabled(false);
      // Handle errors
      if (error.response) {
        if (error.response.status === 403) {
          setErrorPassword(error.response.data.message);
          console.log(error.response.data.message);
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
      <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
        Email
      </Text>
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
      <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
        Password
      </Text>
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
      <View style={styles.orContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => Alert.alert('Thông báo', 'Chức năng đang phát triển')}>
        <Image
          style={styles.socialIcon}
          source={require('../../Resource/icon/facebook.png')}
          resizeMode="cover"
        />
        <Text style={styles.socialButtonText}>Đăng nhập với Facebook</Text>
      </TouchableOpacity>
      <View style={styles.notAcount}>
        <Text>Chưa có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.registerLink}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={isButtonDisabled}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    width: width,
    height: height,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.2,
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
    height: 50,
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
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
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    width: '30%',
    backgroundColor: '#D9D9D9',
  },
  orText: {
    marginHorizontal: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  socialButton: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    marginTop: 20,
    flexDirection: 'row',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  socialButtonText: {
    fontSize: 14,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'white',
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

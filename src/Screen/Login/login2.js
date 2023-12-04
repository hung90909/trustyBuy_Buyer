import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {checkEmail, checkPassword} from '../../compoment/checkValidate';
import {Login_API} from '../../config/urls';
import {apiPost, setItem} from '../../utils/utils';

const Login2 = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigation();

  const checkValidateLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      setErrorEmail('Vui lòng nhập đầy đủ thông tin');
      setErrorPassword('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!checkEmail(email)) {
      setErrorEmail('Email không đúng định dạng');
      return;
    }

    if (!checkPassword(password)) {
      setErrorPassword('Password không quá 15 ký tự');
      return;
    }

    try {
      const res = await apiPost(Login_API, {email, password});
      setItem('token', res?.message);
      nav.replace('Main');
    } catch (error) {
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
        <Text style={styles.title}>Đăng nhập</Text>
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

      <View style={styles.footer}>
        <View style={styles.line}>
          <View style={{height: 1, width: '40%', backgroundColor: '#D9D9D9'}} />
          <Text style={{marginHorizontal: 10, color: 'black'}}>Hoặc</Text>
          <View style={{height: 1, width: '40%', backgroundColor: '#D9D9D9'}} />
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.btn}>
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={require('../../Resource/icon/facebook.png')}
            />
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity style={styles.btn}>
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={require('../../Resource/icon/google.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.notAcount}>
          <Text>Chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate('Register');
            }}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>Đăng ký</Text>
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
  title: {
    marginVertical: 20,
    alignSelf: 'center',
    fontSize: 30,
    color: 'black',
    fontWeight: '800',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  textInput: {
    width: '100%',
    height: 50,
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
  passwordInput: {
    marginStart: 10,
    flex: 1,
    width: '100%',
  },
  passwordToggle: {
    position: 'absolute',
    right: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginStart: 15,
  },
  loginButton: {
    width: '100%',
    height: 40,
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
  footer: {
    marginTop: '30%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  notAcount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn: {
    width: 80,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },
});

export default Login2;

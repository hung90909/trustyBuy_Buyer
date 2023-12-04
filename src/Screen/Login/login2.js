import React, {useState} from 'react';
import {
  Text,
  View,
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
import {setItem} from '../../utils/utils';

const Login2 = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const checkValidateLogin = () => {
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

    fetch(Login_API, {
      method: 'POST',
      body: JSON.stringify({email, password, role: 'User'}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(async data => {
        const accessToken = data.message;
        if (accessToken) {
          nav.navigate('Main');
        }

        await setItem('token', accessToken);
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.Text}>TrustyBuy</Text> */}
        <Image
          source={require('../../Resource/Image/logo.png')}
          style={styles.image}
        />
        <Text
          style={{
            marginVertical: 20,
            alignContent: 'center',
            alignSelf: 'center',
            fontSize: 30,
            color: 'black',
            fontWeight: '800',
          }}>
          Đăng nhập
        </Text>
      </View>
      <View style={styles.textInput}>
        <Fontisto name="email" size={25} color={'black'} />
        <TextInput
          onChangeText={text => {
            setEmail(text);
            setErrorEmail('');
          }}
          style={{
            marginStart: 10,
            width: '100%',
          }}
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
          style={{
            marginStart: 10,
            flex: 1,
            width: '100%',
          }}
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
      <TouchableOpacity
        onPress={() => {
          checkValidateLogin();
        }}
        style={styles.loginButton}>
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
  Text: {
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 25,
  },
  body: {
    height: 400,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  notAcount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  passwordToggle: {
    position: 'absolute',
    right: 20,
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

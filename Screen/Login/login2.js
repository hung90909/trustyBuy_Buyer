import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {checkEmail, checkPassword} from '../../compoment/checkValidate';
import {API_Login} from '../../API/getAPI';

export default Login2 = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation();

  const checkValidateLogin = () => {
    if (email.length === 0 && password.length === 0) {
      setErrorEmail('Vui lòng nhập đầy đủ thông tin');
      setErrorPassword('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (email.length === 0) {
      setErrorEmail('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password.length === 0) {
      setErrorPassword('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (errorEmail.length !== 0 || errorPassword.length !== 0) {
      return;
    }
    fetch(API_Login, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json()) // Chuyển phản hồi thành JSON
      .then(data => {
        const accessToken = data.message.accessToken;
        // Lưu token vào AsyncStorage
        nav.navigate('Main');
        AsyncStorage.setItem('access_token', JSON.stringify(accessToken))
          .then(() => {
            console.log('Token đã được lưu vào AsyncStorage.');
          })
          .catch(err =>
            console.log('Lỗi khi lưu token vào AsyncStorage:', err),
          );
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Text}>TrustyBuy</Text>
        <Text
          style={{
            marginTop: 16,
            alignContent: 'center',
            alignSelf: 'center',
            fontSize: 30,
            color: 'black',
          }}>
          Đăng nhập
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.textInput}>
          <Fontisto name="email" size={25} color={'black'} />
          <TextInput
            onChangeText={text => {
              if (checkEmail(text)) {
                setEmail(text);
                setErrorEmail('');
              } else {
                setEmail(text);
                setErrorEmail('Email không đúng định dạng');
              }
            }}
            style={{
              marginStart: 10,
            }}
            placeholder="Email"
          />
        </View>
        {errorEmail && (
          <Text
            style={{
              color: 'red',
              marginTop: 5,
              marginStart: 15,
            }}>
            {errorEmail}
          </Text>
        )}
        <View style={styles.textInput}>
          <SimpleLineIcons name="lock" size={25} />
          <TextInput
            onChangeText={text => {
              if (checkPassword(text)) {
                setPassword(text);
                setErrorPassword('');
              } else {
                setErrorPassword('Password không quá 15 ký tự');
              }
            }}
            style={{
              marginStart: 10,
            }}
            placeholder="Mật khẩu"
            secureTextEntry
          />
        </View>
        {errorPassword && (
          <Text
            style={{
              color: 'red',
              marginTop: 5,
              marginStart: 15,
            }}>
            {errorPassword}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            checkValidateLogin();
          }}
          style={{
            width: '100%',
            height: 40,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: errorPassword ? 20 : 40,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
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
  btn: {
    width: 80,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },
  container: {
    flex: 1,
  },
  header: {
    height: '25%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Text: {
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  body: {
    height: checkPassword ? '50%' : '40%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // backgroundColor:"red"
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: checkEmail ? 20 : 10,
    paddingHorizontal: 15,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    //    backgroundColor:"red"
  },
  line: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  notAcount: {flexDirection: 'row', justifyContent: 'center', marginTop: 20},
});

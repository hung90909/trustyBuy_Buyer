import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
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
    // nav.navigate("Main")
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
  console.log('Login successful');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            nav.navigate('Login');
          }}>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../../Resource/icon/back.png')}
          />
        </TouchableOpacity>

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
          <Image
            style={{
              width: 25,
              height: 25,
              marginStart: 20,
            }}
            source={require('../../Resource/icon/user.png')}
          />
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
            placeholder="Email / Số điện thoại"
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
          <Image
            style={{
              width: 25,
              height: 25,
              marginStart: 20,
            }}
            source={require('../../Resource/icon/clock.png')}
          />
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

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text style={{fontSize: 16}}>Ghi nhớ</Text>
        </View>
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
            borderRadius: 20,
            elevation: 3,
          }}>
          <Text style={{color: 'white'}}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
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
  btn: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    height: '25%',
  },
  Text: {
    alignSelf: 'center',
    fontSize: 35,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  body: {
    height: checkPassword ? '50%' : '40%',
    // backgroundColor:"red"
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: checkEmail ? 20 : 10,
  },
  footer: {
    flex: 1,
    marginTop: 10,
    //    backgroundColor:"red"
  },
  line: {
    marginTop: 10,
    height: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  notAcount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

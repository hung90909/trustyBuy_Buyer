import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {checkEmail, checkPassword} from '../../compoment/checkValidate';
import {API_Signup} from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Register = () => {
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

    const data = {
      email,
      password,
      role: 'User',
    };
    fetch(API_Signup, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(reponse => reponse.json())
      .then(reponse => {
        console.log(reponse);
        if (reponse.status === 200) {
          AsyncStorage.setItem('access_token', JSON.stringify(reponse.newUser))
            .then(() => {
              console.log('Token đã được lưu vào AsyncStorage.');
            })
            .catch(err =>
              console.log('Lỗi khi lưu token vào AsyncStorage:', err),
            );

          nav.navigate('RegisterInformation');
        } else {
          console.log(reponse.message);
        }
      })
      .catch(err => console.log(err));
    // nav.navigate('RegisterInformation')
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <Ionicons name="arrow-back" size={25} color={'black'} />
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
          Tạo tài khoản
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
            elevation: 3,
          }}>
          <Text style={{color: 'white'}}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.notAcount}>
          <Text>Đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate('Login2');
            }}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>Đăng nhập</Text>
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
  },
  header: {
    height: '25%',
    padding: 20,
    justifyContent: 'center',
  },
  Text: {
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  body: {
    height: '40%',
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  footer: {
    flex: 1,
    marginTop: checkPassword ? 30 : 10,
    justifyContent: 'center',
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

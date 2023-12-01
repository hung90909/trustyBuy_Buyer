import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { checkEmail, checkPassword } from '../../compoment/checkValidate';
import { SIGNUP_API } from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
export default Register = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

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
    fetch(SIGNUP_API, {
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <Ionicons name="arrow-back" size={25} color={'black'} />
        </TouchableOpacity>

        <Text style={styles.Text}>TrustyBuy</Text>
      </View>
      <View style={styles.header}>

        <Image
          source={require('../../Resource/Image/logo.png')}
          style={styles.image}
        />
        <Text
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            fontSize: 30,
            color: 'black',
            marginBottom: 40
          }}>
          Tạo tài khoản
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
            width: '100%'
          }}
          placeholder="Email"
        />
      </View>
      {
        errorEmail !== '' && (
          <Text style={styles.errorText}>{errorEmail}</Text>
        )
      }
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
            width: '100%'
          }}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {
        errorPassword !== '' && (
          <Text style={styles.errorText}>{errorPassword}</Text>
        )
      }
      <TouchableOpacity
        onPress={() => {
          checkValidateLogin();
        }}
        style={styles.loginButton}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 20, marginVertical: 90 }}>

        <View style={styles.line}>
          <View style={{ height: 1, width: '40%', backgroundColor: '#D9D9D9' }} />
          <Text style={{ marginHorizontal: 10, color: 'black' }}>Hoặc</Text>
          <View style={{ height: 1, width: '40%', backgroundColor: '#D9D9D9' }} />
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
          <View style={{ width: 20 }} />
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
              nav.navigate('Login2');
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 70
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
    flexDirection: "row",
    alignItems: 'center'
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
  }, passwordToggle: {
    position: 'absolute',
    right: 20,

  }, btn: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },
});

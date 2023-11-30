import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkEmail, checkPassword} from '../compoment/checkValidate';
import axios from 'axios';
import {API_BASE} from '../API/getAPI';

export default ChangePassword = () => {
  const [errorPassword, setErrorPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordOld, setOldPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const nav = useNavigation();

  const handlerChangePassword = async () => {
    if (
      passwordOld.length == 0 ||
      password.length == 0 ||
      passwordConfirm.length == 0
    ) {
      setErrorPassword('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const api = `${API_BASE}/v1/api/user/changePassword`; // tạo config riêng nhé
    //Lấy token và userId trong storage nhé
    const userId = '655992c8b8ffe55cb44e9673';
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTU5OTJjOGI4ZmZlNTVjYjQ0ZTk2NzMiLCJlbWFpbCI6Im5na2hhY2RhaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRrT0ozSlVMRElmVnpNRWVMTXVlcVplLkdhMURCZXBFYVRZLy4ydmtTa0xHaEZ5amxTL28wNiIsImlhdCI6MTcwMDk4MzA4OSwiZXhwIjoxNzAxODQ3MDg5fQ.iybYQqXa_T20hTTOnm6hGVVBTxYDTWKhEitk3MtiEQU';
    const formData = {
      oldPassword: passwordOld,
      newPassword: password,
    };
    await axios
      .put(api, formData, {
        headers: {
          'x-xclient-id': userId,
          authorization: accessToken,
        },
      })
      .then(res => {
        console.log(res);
        //Them cai thong bao nhe
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../Resource/icon/back.png')}
          />
        </TouchableOpacity>

        <Text
          style={{
            marginTop: 15,
            fontSize: 40,
            color: 'black',
            fontWeight: '500',
            marginRight: 20,
          }}>
          Thay đổi mật khẩu hiện tại của bạn
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
            source={require('../Resource/icon/unlock.png')}
          />
          <TextInput
            onChangeText={text => {
              if (checkPassword(text)) {
                setOldPassword(text);
                setErrorPassword('');
              } else {
                setErrorPassword('Password không quá 15 ký tự');
              }
            }}
            style={{
              marginStart: 10,
            }}
            placeholder="Nhập mật khẩu cũ của bạn"
          />
        </View>
        <View style={styles.textInput}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginStart: 20,
            }}
            source={require('../Resource/icon/unlock.png')}
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
            placeholder="Nhập mật khẩu mới"
          />
        </View>
        <View style={styles.textInput}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginStart: 20,
            }}
            source={require('../Resource/icon/reset-password.png')}
          />
          <TextInput
            onChangeText={text => {
              if (checkPassword(text)) {
                setPasswordConfirm(text);
                setErrorPassword('');
              } else {
                setErrorPassword('Password không quá 15 ký tự');
              }
            }}
            style={{
              marginStart: 10,
            }}
            placeholder="Nhập lại mật khẩu mới"
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
            handlerChangePassword();
          }}
          style={{
            width: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: errorPassword ? 20 : 40,
            borderRadius: 20,
            elevation: 3,
            paddingVertical: 15,
          }}>
          <Text style={{color: 'white'}}>Thay đổi</Text>
        </TouchableOpacity>
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
    height: checkPassword ? '60%' : '50%',
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
  notAcount: {flexDirection: 'row', justifyContent: 'center', marginTop: 20},
});

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert, // Import Alert
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkEmail, checkPassword} from '../compoment/checkValidate'; // Import checkPassword
import {USER_API} from '../config/urls';
import {apiPut} from '../utils/utils';

export default ChangePassword = () => {
  const [errorPassword, setErrorPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordOld, setOldPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const nav = useNavigation();

  const handlerChangePassword = async () => {
    if (
      passwordOld.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      setErrorPassword('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const res = await apiPut(`${USER_API}/changePassword`, {
        oldPassword: passwordOld,
        newPassword: password,
      });

      console.log(res);
      if (res && res.data && res.data.success) {
        console.log('Password change successful');
        // Show success alert
        Alert.alert('Success', 'Password changed successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Clear input fields
              setOldPassword('');
              setPassword('');
              setPasswordConfirm('');
              setErrorPassword('');
            },
          },
        ]);
      } else {
        console.log('Password change failed');
      }
    } catch (error) {
      console.log(error);
    }
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
            borderRadius: 5,
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
    borderRadius: 5,
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

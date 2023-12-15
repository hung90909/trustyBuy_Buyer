import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {SIGNUP_API} from '../../config/urls';
import Feather from 'react-native-vector-icons/Feather';
import {apiPost} from '../../utils/utils';

const {width, height} = Dimensions.get('window');

export default Register = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const checkValidateLogin = async () => {
    const role = 'User';

    try {
      if (email.length === 0 && password.length === 0) {
        setErrorEmail('Vui lòng nhập đầy đủ thông tin');
        setErrorPassword('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      if (email.length === 0) {
        setErrorEmail('Vui lòng nhập email');
        return;
      }
      if (password.length === 0) {
        setErrorPassword('Vui lòng nhập mật khẩu');
        return;
      }
      if (errorEmail.length !== 0 || errorPassword.length !== 0) {
        return;
      } else {
        // try {
        const res = await apiPost(SIGNUP_API, {
          email: email,
          password: password,
          role: role,
        })
          .then(res => {
            nav.navigate('OtpScreen', {
              email: email,
              password: password,
              role: role,
            });
          })

          .catch(e => {
            if (e.code === 403) {
              setErrorEmail('Email đã được đăng kí');
            }
          });
      }
    } catch (error) {
      console.error('Error in checkValidateLogin:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../Resource/Image/logo.jpeg')}
          style={styles.image}
        />
        <Text style={styles.heading}>Tạo tài khoản</Text>
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
            // Limit the password to a maximum of 20 characters
            const truncatedPassword = text.slice(0, 20);
            setPassword(truncatedPassword);
            setErrorPassword('');
          }}
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          maxLength={20} // Maximum length
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
        style={styles.registerButton}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.notAcount}>
        <Text>Bạn đã có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => {
            nav.navigate('Login2');
          }}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
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
    height: 60,
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
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
  registerButton: {
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
    marginTop: 100,
  },
  loginLink: {
    fontWeight: 'bold',
    color: 'black',
  },
});

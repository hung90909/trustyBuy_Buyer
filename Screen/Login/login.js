import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../Resource/Image/logo.png')}
          style={styles.image}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            fontStyle: 'normal',
          }}>

        </Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.continue}>
          <View style={{ width: 70 }} />
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
            source={require('../../Resource/icon/facebook.png')}
          />
          <Text style={{ color: 'black' }}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continue}>
          <View style={{ width: 70 }} />
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
            source={require('../../Resource/icon/google.png')}
          />
          <Text style={{ color: 'black' }}>Tiếp tục với Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.line}>
          <View style={{ height: 0.3, width: '40%', backgroundColor: 'black' }} />
          <Text style={{ marginHorizontal: 10, color: 'black' }}>Hoặc</Text>
          <View style={{ height: 0.3, width: '40%', backgroundColor: 'black' }} />
        </View>
        <TouchableOpacity
          onPress={() => {
            nav.navigate('Login2');
          }}
          style={styles.btnLogin}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.notAcount}>
          <Text>Chưa có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate('Register');
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '30%',

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  body: {
    width: '100%',
    height: '30%',
    marginVertical: 20,


  },
  continue: {
    width: '100%',
    height: 45,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,

    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30
  },
  footer: {
    flex: 1,
  },
  line: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnLogin: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    marginTop: 50,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  notAcount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  }, image: {
    width: 200, // Đặt kích thước ảnh theo ý bạn
    height: 200,
    resizeMode: 'contain', // Tùy chỉnh theo yêu cầu của bạn
  },
});
export default Login;

import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>TrustyBuy</Text>
  </View>
);

const ContinueButton = ({source, text}) => (
  <TouchableOpacity style={styles.continue}>
    <View style={{width: 70}} />
    <Image style={styles.icon} source={source} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const Login = () => {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <ContinueButton
          source={require('../../Resource/icon/facebook.png')}
          text="Tiếp tục với Facebook"
        />
        <ContinueButton
          source={require('../../Resource/icon/google.png')}
          text="Tiếp tục với Google"
        />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.line}>
          <View style={styles.lineSeparator} />
          <Text style={styles.lineText}>Hoặc</Text>
          <View style={styles.lineSeparator} />
        </View>
        <TouchableOpacity
          onPress={() => nav.navigate('Login2')}
          style={styles.btnLogin}>
          <Text style={{color: 'white'}}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.notAcount}>
          <Text>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => nav.navigate('Register')}>
            <Text style={styles.boldText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    width: '100%',
    height: '30%',
  },
  continue: {
    width: '100%',
    height: 45,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  footerContainer: {
    flex: 1,
  },
  line: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineSeparator: {
    height: 0.3,
    width: '40%',
    backgroundColor: 'black',
  },
  lineText: {
    marginHorizontal: 10,
    color: 'black',
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
  },
  headerText: {
    fontSize: 40,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'normal',
  },
  buttonText: {
    color: 'black',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Login;

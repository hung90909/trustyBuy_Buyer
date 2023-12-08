import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {OTP_API, SIGNUP_API} from '../../config/urls';
import {apiPost} from '../../utils/utils';
import {useNavigation, useRoute} from '@react-navigation/native';

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {email, password, role} = route.params || {};

  useEffect(() => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
  }, [email, password, role]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          setShowResendButton(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) {
      return; // Allow only numeric input
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    if (index < 5 && value !== '') {
      this[`otpInput${index + 1}`].focus();
    }

    setOtp(newOtp);
  };

  const handleResend = async () => {
    setTimer(60);
    setShowResendButton(false);
    setError('');

    try {
      await apiPost(SIGNUP_API, {
        email: email,
        password: password,
        role: role,
      });
    } catch (error) {
      console.log(error.message);
    }

    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          setShowResendButton(true);
          return 0;
        }
      });
    }, 1000);
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    // Uncomment the following line if you want to verify OTP on submit
    // handleVerifyOTP();
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await apiPost(OTP_API, {
        email: email,
        password: password,
        role: role,
        otp: otp.join(''),
      });

      if (res.status === 200) {
        console.log('Registration successful');
        navigation.navigate('RegisterInformation');
      } else {
        setError(res.data.message);
        console.log('===============');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderOtpInputs = () => {
    return otp.map((digit, index) => (
      <TextInput
        key={index}
        style={[
          styles.otpInput,
          {borderColor: digit !== '' ? 'transparent' : 'black'},
        ]}
        onChangeText={value => handleOtpChange(index, value)}
        value={digit}
        keyboardType="numeric"
        maxLength={1}
        ref={input => (this[`otpInput${index}`] = input)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Resource/Image/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Nhập mã OTP để xác thực</Text>
      <Text style={styles.subtitle}>Đoạn mã đã được gửi về gmail</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.otpContainer}>{renderOtpInputs()}</View>
      <TouchableOpacity style={styles.submitButton} onPress={handleVerifyOTP}>
        <Text style={styles.submitButtonText}>Xác nhận</Text>
      </TouchableOpacity>
      {showResendButton ? (
        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendButtonText}>Gửi lại mã</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.timerText}>Mã OTP còn {timer} giây</Text>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: 'gray',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    fontSize: 18,
    width: 40,
    height: 40,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  resendButton: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  timerText: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
});

export default OtpScreen;

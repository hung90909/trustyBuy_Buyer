import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {OTP_API, SIGNUP_API} from '../../config/urls';
import {apiPost} from '../../utils/utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59); // Start with 59 seconds for a full minute
  const [showResendButton, setShowResendButton] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false); // New state variable
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {email, password, role} = route.params || {};

  // Log email, password, and role when they change
  useEffect(() => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
  }, [email, password, role]);

  // Countdown effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      } else if (minutes > 0) {
        setMinutes(prevMinutes => prevMinutes - 1);
        setSeconds(59);
      } else {
        clearInterval(intervalId);
        setShowResendButton(true);
        setIsResendDisabled(false); // Enable the resend button
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  // Handle OTP input change
  // Handle OTP input change
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

    // Check if all OTP digits are entered, then clear the error
    if (index === 5 - 1 && value !== '') {
      setError('');
    }
  };

  // Handle resend button click
  const handleResend = async () => {
    setMinutes(0);
    setSeconds(59); // Reset seconds for a full minute
    setShowResendButton(false);
    setError('');
    setIsResendDisabled(true); // Disable the resend button

    try {
      await apiPost(SIGNUP_API, {
        email: email,
        password: password,
        role: role,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    // Check if any of the OTP digits is empty
    if (otp.some(digit => digit === '')) {
      setError('Vui lòng nhập đầy đủ mã OTP.');
      return;
    }

    try {
      const res = await apiPost(OTP_API, {
        email: email,
        password: password,
        role: role,
        otp: otp.join(''),
      });

      console.log(res);
      if (res.status === 200) {
        console.log('Registration successful');
        AsyncStorage.setItem('_id', res.newUser._id);
        console.log(res.newUser._id);
        navigation.navigate('RegisterInformation');
      } else {
        // setError('Mã OTP không hợp lệ. Vui lòng kiểm tra lại.');
        console.log('===============');
      }
    } catch (error) {
      // console.log(error.code);
      if (error.code === 403) {
        setError('Mã không chính xác');
      }
      // Alert.alert('Thông báo', error.message);
    }
  };

  // Render OTP input fields
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

  // Render the component
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Resource/Image/logo.png')}
        style={styles.logo}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Xác minh tài khoản</Text>
        <Text style={styles.subtitle}>
          Mã xác thực đã được gửi đến địa chỉ email của bạn
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.otpContainer}>{renderOtpInputs()}</View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleVerifyOTP}>
        <Text style={styles.submitButtonText}>Xác nhận</Text>
      </TouchableOpacity>
      <Text style={styles.timerText}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}{' '}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>Không nhận được mã ? </Text>
        <TouchableOpacity
          style={[
            styles.resendButton,
            isResendDisabled && {opacity: 0.2}, // Adjust opacity when disabled
          ]}
          onPress={handleResend}
          disabled={isResendDisabled}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Gửi lại mã</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  logo: {
    height: 150,
    width: 150,
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
    color: 'black',
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  otpInput: {
    borderWidth: 1,
    fontSize: 16,
    width: 50,
    height: 50,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 25,
    borderColor: 'black',
  },
  submitButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginVertical: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  resendButton: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    marginVertical: 10,
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

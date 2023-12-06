import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const genders = [
  {label: 'Nam', value: 'Nam'},
  {label: 'Nữ', value: 'Nữ'},
];

const RegisterInformation = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState(null);
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [tuoiError, setTuoiError] = useState('');
  const [userID, setUserID] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      const tokenUser = token ? JSON.parse(token) : null;
      console.log('Token save:', tokenUser._id);
      setUserID(tokenUser?._id || '');
    };

    getToken();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    setNameError('');
    setUsernameError('');
    setPhoneError('');
    setGenderError('');
    setTuoiError('');

    if (!name) {
      setNameError('Vui lòng nhập họ và tên');
    }
    if (!username) {
      setUsernameError('Vui lòng nhập tên tài khoản');
    }
    if (!phone) {
      setPhoneError('Vui lòng nhập số điện thoại');
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Số điện thoại không hợp lệ');
    }
    if (!value) {
      setGenderError('Vui lòng chọn giới tính');
    } else if (!tuoiError) {
      onRegisterInformations();
    }
  };

  const onRegisterInformations = () => {
    const data = {
      fullName: name,
      phoneNumber: phone,
      gender: value,
    };

    fetch(
      `https://fbf9-123-24-162-159.ngrok-free.app/v1/api/user/setUpAcc/${userID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then(() => navigation.navigate('Login2'))
      .catch(err => console.log(err));
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000000"
              onPress={() => navigation.navigate('Register')}
            />
            <View style={{flex: 1, alignItems: 'center', marginRight: 20}}>
              <Text style={{color: '#000000', fontWeight: '600', fontSize: 18}}>
                Thông tin cá nhân
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Pressable>
            <Image
              style={styles.profileImage}
              source={require('../Resource/Image/imgpro.png')}
            />
          </Pressable>
        </View>
        <View style={{marginTop: 20}}>
          <TextInput
            style={styles.textinput}
            placeholder="Họ và tên"
            value={name}
            onChangeText={text => {
              setName(text);
              setNameError('');
            }}
          />
          {nameError && <Text style={styles.errorText}>{nameError}</Text>}

          <TextInput
            style={styles.textinput}
            placeholder="Tên tài khoản"
            value={username}
            onChangeText={text => {
              setUsername(text);
              setUsernameError('');
            }}
          />
          {usernameError && (
            <Text style={styles.errorText}>{usernameError}</Text>
          )}
          <TextInput
            style={styles.textinput}
            placeholder="Ngày sinh"
            value={date.toLocaleDateString()}
            onFocus={() => setShowDatePicker(true)}
          />
          {tuoiError && <Text style={styles.errorText}>{tuoiError}</Text>}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={onChange}
            />
          )}

          <TextInput
            style={styles.textinput}
            placeholder="Số điện thoại"
            value={phone}
            keyboardType="numeric"
            onChangeText={text => {
              setPhone(text);
              setPhoneError('');
            }}
          />
          {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={genders}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder="Giới tính"
              value={value}
              onChange={item => {
                setValue(item.value);
                setGenderError('');
              }}
            />
          </View>
          {genderError && <Text style={styles.errorText}>{genderError}</Text>}
        </View>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Tiếp Tục</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = {
  profileImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 130,
    borderWidth: 2,
    borderColor: '#33CCFF',
  },
  textinput: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    width: '90%',
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#0A0303',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 20,
    paddingHorizontal: 15,
  },
  label: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
};

export default RegisterInformation;

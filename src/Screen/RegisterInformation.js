import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  PermissionsAndroid,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {USER_API} from '../config/urls';

const genders = [
  {label: 'Nam', value: 'Nam'},
  {label: 'Nữ', value: 'Nữ'},
];

const RegisterInformation = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState(null);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [userID, setUserID] = useState('');
  const [selectedImages, setSelectedImages] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('_id');
      setUserID(token);
    };
    getToken();
  }, []);

  const handleSubmit = () => {
    setNameError('');
    setPhoneError('');
    setGenderError('');

    if (!name) {
      setNameError('Vui lòng nhập họ và tên');
    }
    if (!phone) {
      setPhoneError('Vui lòng nhập số điện thoại');
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Số điện thoại không hợp lệ');
    }
    if (!value) {
      setGenderError('Vui lòng chọn giới tính');
    } else {
      onRegisterInformations();
    }
  };

  const openCamera = async isFrontCamera => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      const result = isFrontCamera
        ? await launchCamera({mediaType: 'photo'})
        : await launchImageLibrary({mediaType: 'photo'});

      setSelectedImages(result.assets[0]?.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const selectImageOption = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn lấy ảnh từ?',
      [
        {text: 'Chụp ảnh ', onPress: () => openCamera(true)},
        {text: 'Thư viện ', onPress: () => openCamera(false)},
      ],
      {cancelable: true},
    );
  };

  const onRegisterInformations = async () => {
    const formData = new FormData();
    formData.append('fullName', name);
    formData.append('phoneNumber', phone.toString());
    formData.append('gender', value);

    if (selectedImages) {
      formData.append('avatar', {
        uri: selectedImages,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    }

    try {
      await axios.post(`${USER_API}/setUpAcc/${userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If the request is successful, navigate to 'Login2'
      navigation.navigate('Login2');
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#000000"
          onPress={() => navigation.navigate('Register')}
        />
        <Text style={styles.headerText}>Thông tin cá nhân</Text>
      </View>

      <View style={styles.formContainer}>
        <Pressable style={styles.imagePicker} onPress={selectImageOption}>
          <Image
            style={styles.profileImage}
            source={
              selectedImages
                ? {uri: selectedImages}
                : require('../Resource/Image/camera.png')
            }
            resizeMode="cover"
          />
        </Pressable>
        <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          Họ và tên
        </Text>

        <View style={styles.inputContainer}>
          <Feather name="user" size={22} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Nhập họ và tên"
            value={name}
            onChangeText={text => {
              setName(text);
              setNameError('');
            }}
          />
        </View>
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}

        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Số điện thoại
        </Text>

        <View style={styles.inputContainer}>
          <Feather name="phone" size={22} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Nhập số điện thoại"
            value={phone}
            keyboardType="numeric"
            onChangeText={text => {
              setPhone(text);
              setPhoneError('');
            }}
          />
        </View>
        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Giới tính
        </Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="transgender" size={22} style={styles.inputIcon} />
          <Dropdown
            style={styles.dropdown}
            data={genders}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder="Chọn giới tính"
            value={value}
            onChange={item => {
              setValue(item.value);
              setGenderError('');
            }}
          />
        </View>
        {genderError && <Text style={styles.errorText}>{genderError}</Text>}

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Tiếp Tục</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
    fontWeight: '600',
    fontSize: 18,
  },
  formContainer: {
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    width: '90%', // Adjust the width as needed
    alignSelf: 'center',
    flex: 1,
  },
  imagePicker: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    margin: 10,
  },
  dropdown: {
    marginVertical: 10,
    height: 50,
    borderBottomColor: 'gray',
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderColor: 'black', // Add this line for border color
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 5,
    backgroundColor: 'black',
    marginTop: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
    color: 'black',
  },
});

export default RegisterInformation;

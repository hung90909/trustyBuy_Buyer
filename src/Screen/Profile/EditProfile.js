import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {API_BASE, API_BASE_URL, USER_API} from '../../config/urls';
import axios from 'axios';
import {PermissionsAndroid} from 'react-native';
import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {apiGet} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  {label: 'Nam', value: '1'},
  {label: 'Nữ', value: '2'},
];

const EditProfile = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [value, setValue] = useState(null);
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [genderError, setGenderError] = useState('');
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const fetchData = async () => {
    try {
      const res = await apiGet(`${USER_API}/getProfile`);
      setUsername(res?.message.checkUser.information.fullName);
      setName(res?.message.checkUser.user_name);
      setPhone(res?.message.checkUser.information.phoneNumber.toString());
      setAvatar(res?.message.checkUser.information.avatar);
      setValue(res?.message.checkUser.information.gender);
      console.log(res?.message.checkUser.information.gender);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCamera = async isFrontCamera => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      const result = isFrontCamera
        ? await launchCamera({mediaType: 'photo'})
        : await launchImageLibrary({mediaType: 'photo'});

      setSelectedImages(result.assets[0]?.uri);
      console.log(selectedImages);
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

  const handleSubmit = async () => {
    console.log();
    if (!username) {
      setUsernameError('Vui lòng nhập tên tài khoản');
    }
    if (!phone) {
      setPhoneError('Vui lòng nhập số điện thoại');
    }
    if (!value) {
      setGenderError('Vui lòng chọn giới tính');
    }

    const birthDate = new Date(date);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    const data = await AsyncStorage.getItem('token');
    const userId = JSON.parse(data).userId;
    const accessToken = JSON.parse(data).accessToken;

    const formData = new FormData();
    formData.append('phoneNumber', phone);
    if (selectedImages) {
      formData.append('avatar', {
        uri: selectedImages,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    } else {
      formData.append('avatar', {
        uri: `${API_BASE_URL}${avatar}`,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    }

    formData.append('fullName', username);
    formData.append('gender', value);
    await axios
      .put(`${USER_API}/updateUser`, formData, {
        headers: {
          'x-xclient-id': userId,
          authorization: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(e => {
        console.log(e);
        navigation.goBack();
      });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginLeft: 10,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000000"
              onPress={() => navigation.goBack()}
            />
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={{color: '#000000', fontWeight: '600', fontSize: 18}}>
                Thay đổi thông tin cá nhân
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infor_profile}>
          <View style={styles.avatar_container}>
            <Image
              style={styles.avatar}
              source={{
                uri: selectedImages ?? `${API_BASE_URL}${avatar}`,
              }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.edit_icon_container}
              onPress={() => {
                selectImageOption();
              }}>
              <Image
                source={require('../../Resource/icon/edit-text.png')}
                style={styles.edit_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            color: '#000',
            textDecorationLine: 'underline',
          }}>
          Thông tin cá nhân
        </Text>
        <View style={{marginTop: 20}}>
          <TextInput
            style={styles.textinput}
            placeholder="Họ và tên"
            value={username}
            onChangeText={text => {
              setUsername(text);
              setNameError('');
            }}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
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
            keyboardType="numeric"
            value={phone}
            onChangeText={text => {
              setPhone(text);
              setPhoneError('');
            }}
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={value}
              value={value}
              onChange={item => {
                setValue(item.value);
                setGenderError('');
              }}
            />
          </View>
          {genderError ? (
            <Text style={styles.errorText}>{genderError}</Text>
          ) : null}
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
  avatar_container: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  edit_icon_container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 20,
  },
  edit_icon: {
    width: 17,
    height: 17,
  },
  infor_profile: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d0d0d0',
    paddingBottom: 20,
    marginBottom: 20,
  },
};

export default EditProfile;

import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {USER_API} from '../../../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAdress = ({isVisible, onClose}) => {
  const handleNewAddress = async () => {
    const data = await AsyncStorage.getItem('token');
    const userId = JSON.parse(data).userId;
    const token = JSON.parse(data).accessToken;
    await axios
      .post(
        `${USER_API}/addAddress`,
        {
          nameAddress: name,
          address: detail,
          userinfor: {
            userName: username,
            phoneNumber: phone,
          },
        },
        {
          headers: {
            'x-xclient-id': userId,
            authorization: token,
          },
        },
      )
      .then(res => {
        onClose(false);
      });
    console.log(username), console.log(phone);
    const form = {
      nameAddress: name,
      address: detail,
      userInfor: {
        userName: username,
        phoneNumber: phone,
      },
    };
    console.log(form);
  };
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setphone] = useState('');
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thêm địa chỉ nhận hàng:</Text>
          <Text style={{fontSize: 16, marginBottom: 10, color: 'black'}}>
            Tên địa chỉ :
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Nhập tên địa chỉ"
          />
          <Text style={{fontSize: 16, marginBottom: 10, color: 'black'}}>
            Tên người nhận:
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUsername(text)}
            value={username}
            placeholder="Nhập tên người nhận"
          />
          <Text style={{fontSize: 16, marginBottom: 10, color: 'black'}}>
            Số điện thoại :
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setphone(text)}
            value={phone}
            placeholder="Nhập số điện thoại"
          />
          <Text style={{fontSize: 16, marginBottom: 10, color: 'black'}}>
            Chi tiết :
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setDetail(text)}
            value={detail}
            placeholder="Nhập chi tiết địa chỉ"
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{color: 'black', fontSize: 17, marginRight: 15}}>
                HỦY BỎ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNewAddress()}>
              <Text style={{color: 'red', fontSize: 17}}>THÊM VÀO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddAdress;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: 400,
    height: 600,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,

    color: 'black',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 25,
  },
  suggestionButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 20,
    padding: 6,
    width: 77,
    margin: 5,
  },
  suggestionText: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

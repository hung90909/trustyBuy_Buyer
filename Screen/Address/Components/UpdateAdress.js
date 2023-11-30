import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const UpdateAdress = ({isVisible, onClose}) => {
  const [name, setName] = useState('');
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thay địa chỉ nhận hàng:</Text>
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
            Chi tiết :
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Nhập chi tiết địa chỉ"
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{color: 'black', fontSize: 17, marginRight: 15}}>
                HỦY BỎ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'red', fontSize: 17}}>THAY ĐỔI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateAdress;
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
    width: 350,
    height: 370,
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

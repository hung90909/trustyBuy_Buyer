import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {LOGOUT_API} from '../../config/urls';
import {apiDelete} from '../../utils/utils';
import socketServices from '../../utils/socketService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({visible, onClose}) => {
  const navigation = useNavigation();

  const handlerLogout = async () => {
    try {
      await apiDelete(`${LOGOUT_API}`);
      socketServices.emit('logout');
      AsyncStorage.clear();
      navigation.replace('Login2');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onBackdropPress={onClose}>
      <View style={styles.modal_container}>
        <View style={styles.modal_content}>
          <Text
            style={{
              fontWeight: '500',
              color: 'red',
              fontSize: 22,
              marginBottom: 10,
            }}>
            Logout
          </Text>
          <Text style={{fontWeight: '500', color: 'black', fontSize: 17}}>
            Are you sure you want to log out?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 40,
            }}>
            <TouchableOpacity
              style={[
                styles.button_container,
                {backgroundColor: '#e0e0e0', marginRight: 10},
              ]}
              onPress={onClose}>
              <Text style={{color: 'black'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlerLogout()}
              style={[
                styles.button_container,
                {backgroundColor: 'black', marginLeft: 10},
              ]}>
              <Text style={{color: 'white'}}>Yes, Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button_container: {
    paddingVertical: 15,
    borderRadius: 30,
    width: 160,
    alignItems: 'center',
  },
  modal_content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
});

export default Logout;

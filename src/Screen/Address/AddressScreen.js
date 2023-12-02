import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Text} from '@rneui/themed';
import {TouchableOpacity} from 'react-native';
import AddAdress from './Components/AddAdress';
import UpdateAdress from './Components/UpdateAdress';

const AdressScreen = () => {
  const [listAddress, setListAddress] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const nav = useNavigation();

  useEffect(() => {
    getAddress();
  }, []);
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };
  const toggleUpdateModal = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  const getAddress = async () => {
    const dummyData = [
      {
        address: 'Nhà',
        addressDetail: 'Ngõ 52, Vân Canh, Hoài Đức',
      },
      {
        address: 'Văn phòng',
        addressDetail: 'Khối 10, Quán Hành,Nghi Lộc',
      },
    ];
    setListAddress(dummyData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AddAdress isVisible={isAddModalVisible} onClose={toggleAddModal} />
        <UpdateAdress
          isVisible={isUpdateModalVisible}
          onClose={toggleUpdateModal}
        />
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../../Resource/icon/back.png')}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 22, marginLeft: 20, fontWeight: 'bold'}}>
          Địa chỉ
        </Text>
      </View>
      {listAddress.map((address, index) => (
        <View key={index} style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 55,
                height: 55,
                marginRight: 15,
              }}
              source={require('../../Resource/icon/gps.png')}></Image>
            <View>
              <Text style={{fontWeight: 'bold'}}>{address.address}</Text>
              <Text>{address.addressDetail}</Text>
            </View>
          </View>
          <Image
            onPress={() => {
              toggleUpdateModal();
            }}
            style={{
              width: 22,
              height: 22,
            }}
            source={require('../../Resource/icon/edit.png')}></Image>
        </View>
      ))}
      <TouchableOpacity
        onPress={() => {
          toggleAddModal();
        }}
        style={{
          width: '100%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          elevation: 3,
          paddingVertical: 15,
          position: 'absolute',
          bottom: 0,
        }}>
        <Text style={{color: 'white'}}>Thêm mới địa chỉ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdressScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

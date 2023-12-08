import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Text} from '@rneui/themed';
import {TouchableOpacity, ScrollView} from 'react-native';
import AddAdress from './Components/AddAdress';
import UpdateAdress from './Components/UpdateAdress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiDelete, apiGet} from '../../utils/utils';
import {USER_API} from '../../config/urls';
import axios from 'axios';
// import {ScrollView} from 'react-native-gesture-handler';

const AdressScreen = () => {
  const [listAddress, setListAddress] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const nav = useNavigation();
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  const fetchData = async () => {
    try {
      const res = await apiGet(`${USER_API}/getProfile`);
      setListAddress(res?.message.checkUser.information.address);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async addressId => {
    await apiDelete(`${USER_API}/deleteAddress`, {
      addressId: addressId,
    })
      .then(res => {
        console.log(res);
        fetchData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AddAdress isVisible={isAddModalVisible} onClose={toggleAddModal} />
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 80}}>
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
                <Text style={{fontWeight: 'bold'}}>{address.nameAddress}</Text>
                <Text>{address.customAddress}</Text>
              </View>
            </View>
            <Image
              onPress={() => handleDelete(address._id)}
              style={{
                width: 40,
                height: 40,
              }}
              source={require('../../Resource/icon/bin.png')}></Image>
          </View>
        ))}
      </ScrollView>
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

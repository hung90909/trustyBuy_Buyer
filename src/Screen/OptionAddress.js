import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Text} from '@rneui/themed';
import {TouchableOpacity, ScrollView} from 'react-native';
import {apiGet, apiPut} from '../utils/utils';
import {USER_API} from '../config/urls';
import {useDispatch} from 'react-redux';
import {changeAddress} from '../redux/actions/address';
// import {ScrollView} from 'react-native-gesture-handler';

const OptionAddress = () => {
  const [listAddress, setListAddress] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const nav = useNavigation();
  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const res = await apiGet(`${USER_API}/getProfile`);
      setListAddress(res?.message.checkUser.information.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleChangeAddress = async newAddress => {
    try {
      // Change the address and update the Redux store
      await changeAddress(newAddress);
      //   console.log(newAddress);
      nav.goBack();
    } catch (error) {
      console.error('Error changing address:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../Resource/icon/back.png')}
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
            <Pressable onPress={() => handleChangeAddress(address)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    width: 55,
                    height: 55,
                    marginRight: 15,
                  }}
                  source={require('../Resource/icon/gps.png')}></Image>
                <View>
                  <Text style={{fontWeight: 'bold'}}>
                    {address.nameAddress}
                  </Text>
                  <Text>
                    {address.customAddress.length > 30
                      ? address.customAddress.slice(0, 30) + '\n'
                      : address.customAddress}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OptionAddress;

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

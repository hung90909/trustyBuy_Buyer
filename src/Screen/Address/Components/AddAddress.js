import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Icon} from '@rneui/themed';
import axios from 'axios';

const AddressList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('p');
  const [divisionCode, setDivisionCode] = useState('0');
  const [province, setProvince] = useState(null);
  const [provinceId, setProvinceId] = useState('0');
  const [district, setDistrict] = useState(null);
  const [districtId, setDistrictId] = useState('0');
  const [ward, setWard] = useState(null);
  const [wardId, setWardId] = useState('0');
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const fetchDataDistricts = async () => {
    try {
      const response = await axios.get(
        `https://mall.shopee.vn/api/v4/location/get_child_division_list?use_case=shopee.account&division_id=${divisionCode}`,
      );
      setData(response.data.data.divisions);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDataDistricts();
  }, [divisionCode]);

  const itemClick = ({item}) => {
    let newDataType = '';
    switch (dataType) {
      case 'p':
        setProvince(item.division_name);
        setProvinceId(item.id);
        setDivisionCode(item.id);
        setDistrict(null);
        setDistrictId('0');
        setWard(null);
        setWardId('0');
        newDataType = 'd';
        break;
      case 'd':
        setDivisionCode(item.id);
        setDistrict(item.division_name);
        setDistrictId(item.id);
        setWard(null);
        setWardId('0');
        newDataType = 'w';
        break;
      case 'w':
        setWard(item.division_name);
        newDataType =
          province && district && ward
            ? ''
            : !province
            ? 'p'
            : !district
            ? 'd'
            : 'w';
        if (province && district && ward) {
          const newAddress = `${ward}, ${district}, ${province}`;
          setSelectedAddress(newAddress);
          console.log('Selected Address: ' + newAddress);
        }
        break;
      default:
        break;
    }
    setDataType(newDataType);
    setError(null);
  };

  const addAddress = () => {
    if (province && district && ward) {
      const fullAddress = `${ward}, ${district}, ${province}`;
      console.log('Full Address:', fullAddress);
      // navigation.navigate('AddAddress', {address: fullAddress});
    } else {
      setError('Vui lòng chọn đúng địa chỉ!');
    }
  };

  const changeDataType = newDataType => {
    setDataType(newDataType);
    if (newDataType === 'p') {
      setDivisionCode('0');
    }
    if (
      (newDataType === 'd' && province) ||
      (newDataType === 'w' && district)
    ) {
      setDivisionCode(newDataType === 'd' ? provinceId : districtId);
    }
  };

  const shouldShowList = !province || !district || !ward;

  return (
    <View style={{flex: 1, padding: 20, paddingTop: 35, alignItems: 'center'}}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity
          style={{width: '10%'}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" type="antdesign" size={30} color={'black'} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Địa chỉ
        </Text>
      </View>
      <View style={{flex: 1}}>
        <AddressSection
          label="Tỉnh/Thành phố"
          value={province}
          onPress={() => changeDataType('p')}
        />
        {province && (
          <AddressSection
            label="Quận/Huyện"
            value={district}
            onPress={() => changeDataType('d')}
          />
        )}
        {district && (
          <AddressSection
            label="Xã/Phường/Thị trấn"
            value={ward}
            onPress={() => changeDataType('w')}
          />
        )}
        <View
          style={{
            marginVertical: 10,
            flex: 1,
            backgroundColor: '#EFE3C8',
            borderRadius: 10,
            display: shouldShowList ? 'flex' : 'none',
          }}>
          <FlatList
            data={data}
            ListEmptyComponent={<ActivityIndicator />}
            keyExtractor={item => item.id}
            renderItem={item => (
              <TouchableOpacity onPress={() => itemClick(item)}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderColor: '#201520',
                  }}>
                  <Text
                    style={{color: '#201520', fontSize: 17, marginVertical: 5}}>
                    {item.item.division_name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 10}}>
        {selectedAddress && (
          <Text
            style={{
              color: '#201520',
              fontSize: 20,
              marginVertical: 10,
              textAlign: 'center',
            }}>
            Địa chỉ cho tôi: {selectedAddress}
          </Text>
        )}
        {error && (
          <Text
            style={{
              color: 'red',
              fontSize: 17,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#EFE3C8',
            marginBottom: 10,
            borderRadius: 20,
            paddingVertical: 4,
            borderColor: '#EFE3C8',
            borderWidth: 2,
          }}
          onPress={addAddress}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 25,
              color: '#201520',
            }}>
            Thêm địa chỉ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AddressSection = ({label, value, onPress}) => (
  <Pressable onPress={onPress}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
      <Text style={{color: 'black', fontSize: 20}}>
        {value ? <Text>{value}</Text> : <Text>{label}</Text>}
      </Text>
    </View>
  </Pressable>
);

export default AddressList;

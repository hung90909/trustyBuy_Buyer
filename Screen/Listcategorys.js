import {StyleSheet, Text, View, Pressable, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {danhmucsp} from './data';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const Listcategorys = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tạo đối tượng headers để chứa các thông tin header
        const headers = {
          'x-xclient-id': '654c8a081f10540692bdc998', // Thay 'your-client-id' bằng giá trị thực tế
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDc0NzcyMywiZXhwIjoxNzAxNjExNzIzfQ.e6b2XU7X14vXAilxpFXjwms7kqRcbOI_dQ1UKRS6IRg', // Thay 'your-access-token' bằng giá trị thực tế
        };

        // Thực hiện GET request đến API endpoint với headers
        const response = await axios.get(
          'https://ef22-116-96-44-199.ngrok-free.app/v1/api/category/getAllCategory',
          {
            headers,
          },
        );

        setData(response.data.message.getAllCategory);
        console.log(response.data.message.getAllCategory);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchData();
  }, []);
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
    return (
      <Pressable
        style={{
          width: '25%',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setSelectedItem(item);
          navigation.navigate('ListProduct', {
            danhmucspId: item.id,
          });
        }}>
        <Image
          source={{
            uri: `https://ef22-116-96-44-199.ngrok-free.app/${item?.category_thumb}`,
          }}
        />
        {/* <Image source={item.image} /> */}
        <Text style={{marginTop: 10, fontWeight: 'bold', color: 'black'}}>
          {item.category_name}
        </Text>
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        scrollEnabled={false}
        keyExtractor={item => item._id}
        numColumns={4} // Set the number of columns to 2
        renderItem={renderItem}
        style={{marginHorizontal: 25, marginVertical: 20}}
      />
    </View>
  );
};

export default Listcategorys;

const styles = StyleSheet.create({});

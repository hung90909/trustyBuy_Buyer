import {StyleSheet, Text, View, Pressable, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {danhmucsp} from './data';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_BASE_URL} from '../API/getAPI';
const Listcategorys = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tạo đối tượng headers để chứa các thông tin header
        const headers = {
          'x-xclient-id': '655992c8b8ffe55cb44e9673', // Thay 'your-client-id' bằng giá trị thực tế
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTU5OTJjOGI4ZmZlNTVjYjQ0ZTk2NzMiLCJlbWFpbCI6Im5na2hhY2RhaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRiN2lJci9SenpGbXZ1QWxUMzc5SmNPOU9FOUJpT1hITUY3M0o5cGtmZENJQ1BJNVV1alRyNiIsImlhdCI6MTcwMTM1ODE2OCwiZXhwIjoxNzAyMjIyMTY4fQ.ElSx8RCY3l8wLLr4FGaxfpes5aOEzNQ9YmFueMAxNrI', // Thay 'your-access-token' bằng giá trị thực tế
        };

        // Thực hiện GET request đến API endpoint với headers
        const response = await axios.get(
          // 'https://serverapiecommercefashion.onrender.com/v1/api/category/getAllCategory',
          `${API_BASE_URL}/v1/api/category/getAllCategory`,
          {
            headers,
          },
        );

        setData(response.data.message.category);
        console.log(response.data.message);
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
        {/* <Image
          source={{
            uri: `https://serverapiecommercefashion.onrender.com/${item?.category_thumb}`,
          }}
        /> */}
        <Image
          source={{
            uri: `https://serverapiecommercefashion.onrender.com/${item?.category_thumb}`,
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

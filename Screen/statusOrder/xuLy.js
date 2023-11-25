import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

export default function XuLy() {
  const dataOrderXuLy = [
    {
      id: 1,
      avatarShop:
        'https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      nameShop: 'Tia To',
      image:
        'https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      name: 'Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022',
      color: 'Đen',
      size: 'XL',
      price: 20000000,
      quantity: 3,
      status: 0,
    },
    {
      id: 2,
      avatarShop:
        'https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      nameShop: 'Tia To',
      image:
        'https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      name: 'Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022',
      color: 'Đen',
      size: 'XL',
      price: 20000000,
      quantity: 3,
      status: 0,
    },
    {
      id: 3,
      avatarShop:
        'https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      nameShop: 'Tia To',
      image:
        'https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      name: 'Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022',
      color: 'Đen',
      size: 'XL',
      price: 20000000,
      quantity: 3,
      status: 0,
    },
  ];

  const formatPrice = priceSP => {
    return `₫${priceSP.toLocaleString('vi-VN')}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataOrderXuLy}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.itemOrder}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    source={{uri: item.avatarShop}}
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {item.nameShop}
                  </Text>
                </View>
                <Text>Chờ xác nhận</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={{uri: item.image}}
                />
                {/* <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      width: 200,
                    }}
                    numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text>{item.color} | </Text>
                        <Text>{item.size}</Text>
                      </View>
                    </View>
                    <Text>{item.quantity} sản phẩm</Text>
                  </View>
                  <Text style={{color: 'red', marginTop: 5}}>
                    {formatPrice(item.price)}
                  </Text>
                </View> */}
                <View style={{flex: 1, padding: 3}}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}
                    numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View style={{flexDirection: 'row', marginVertical: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <Text>{item.color}</Text>
                      <View
                        style={{
                          backgroundColor: 'black',
                          height: 10,
                          width: 1,
                          marginHorizontal: 10,
                        }}></View>
                      <Text>{item.size}</Text>
                    </View>

                    <Text>{item.quantity} sản phẩm</Text>
                  </View>

                  <Text style={{color: '#FC6D26', fontSize: 18}}>
                    {formatPrice(item.price)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemOrder: {
    marginVertical: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

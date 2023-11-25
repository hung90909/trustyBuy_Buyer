import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {formatPrice} from './Format';
const Listproducts = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = async () => {
    try {
      // Tạo đối tượng headers để chứa các thông tin header
      const headers = {
        'x-xclient-id': '654c8a081f10540692bdc998', // Thay 'your-client-id' bằng giá trị thực tế
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDc1NTE0NiwiZXhwIjoxNzAxNjE5MTQ2fQ.zdcI4Ce_Zqc0VgtJpi8V9SuIYG_MfZ5PQ0F77MGnye0', // Thay 'your-access-token' bằng giá trị thực tế
      };
      // Thực hiện GET request đến API endpoint với headers
      const response = await axios.get(
        'https://5c34-116-96-44-199.ngrok-free.app/v1/api/product/getAllProductByUser',
        {
          headers,
        },
      );
      setData(response.data.message.allProduct);
      console.log(response.data.message.allProduct);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const handleProductPress = productId => {
    navigation.navigate('DetailProducts', {productId});
    console.log(productId);
  };

  const renderSanpham = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;

    return (
      <Pressable
        onPress={() => handleProductPress(item._id)}
        style={styles.container}>
        <Image
          style={styles.imageSP}
          source={{
            uri: `https://ef22-116-96-44-199.ngrok-free.app/uploads/${item?.product_thumb[0]}`,
          }}
          resizeMode="contain"
        />

        <Text style={styles.nameSp} numberOfLines={2}>
          {item.product_name}
        </Text>
        <View style={styles.containerGia}>
          <Text style={styles.giaSp}>{formatPrice(item.product_price)}</Text>
          <Text style={styles.daBan}>
            Đã bán
            {/* {formatSoldSP(item.soldSP)} */}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        scrollEnabled={false}
        keyExtractor={item => item?._id}
        renderItem={renderSanpham}
        numColumns={2}
        style={{marginBottom: 10}}
      />
    </View>
  );
};

export default Listproducts;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    justifyContent: 'center',
    padding: '3%',
  },
  imageSP: {
    height: 200,
  },
  nameSp: {
    color: '#1B2028',
    fontSize: 14,
  },
  containerGia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    alignItems: 'center',
  },
  giaSp: {
    color: '#FC6D26',
    fontSize: 14,
  },
  daBan: {
    color: '#1B2028',
    fontSize: 10,
  },
});

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
import {sanpham} from './data';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const Listproducts = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Tạo đối tượng headers để chứa các thông tin header
  //       const headers = {
  //         'x-xclient-id': '654c8a081f10540692bdc998', // Thay 'your-client-id' bằng giá trị thực tế
  //         Authorization:
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDMxNzU2OSwiZXhwIjoxNzAxMTgxNTY5fQ.TO9PdoaNWPGr6N_o5Ves3T3si0vVeoJZXd_DMf1A50A', // Thay 'your-access-token' bằng giá trị thực tế
  //       };

  //       // Thực hiện GET request đến API endpoint với headers
  //       const response = await axios.get(
  //         'http://192.168.0.103:3000/v1/api/product/getAllProductByUser',
  //         {
  //           headers,
  //         },
  //       );

  //       setData(response.data.message.allProduct);
  //       // console.log(response.data.message.allProduct);
  //     } catch (error) {
  //       console.error(error.response.data);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const renderSanpham = ({item}) => {
  //   // console.log(item);

  //   const isSelected = selectedItem && selectedItem.id === item.id;
  //   const formatSoldSP = value => {
  //     if (value >= 1000000) {
  //       return `${(value / 1000000).toFixed(1)}M`; // Đơn vị "M" cho giá trị lớn hơn hoặc bằng 1,000,000
  //     } else if (value >= 1000) {
  //       return `${(value / 1000).toFixed(1)}k`; // Đơn vị "k" cho giá trị lớn hơn hoặc bằng 1,000
  //     } else {
  //       return value.toString(); // Giữ nguyên giá trị nếu nhỏ hơn 1,000
  //     }
  //   };
  //   const formatPrice = priceSP => {
  //     const formatter = new Intl.NumberFormat('vi-VN', {
  //       style: 'currency',
  //       currency: 'VND',
  //       currencyDisplay: 'symbol', // Để hiển thị ký hiệu đứng trước số
  //     });
  //     return `₫${priceSP.toLocaleString('vi-VN')}`;
  //   };
  //   return (
  //     <Pressable
  //       style={{
  //         width: '50%',
  //         justifyContent: 'center',
  //         padding: '3%',
  //       }}>
  //       {/* <Image
  //         style={{
  //           height: 200,
  //         }}
  //         source={{
  //           uri: `http://192.168.0.103:3000/uploads/${item?.product_thumb[0]}`,
  //         }}
  //         resizeMode="contain"
  //       /> */}
  //       <Image
  //         style={{
  //           height: 200,
  //         }}
  //         source={{uri: item.imageSP}}
  //         resizeMode="contain"
  //       />
  //       <Text style={{color: '#1B2028', fontSize: 14}} numberOfLines={2}>
  //         {item.nameSP}
  //       </Text>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           marginTop: 25,
  //           alignItems: 'center',
  //         }}>
  //         <Text style={{color: '#FC6D26', fontSize: 14}}>
  //           {formatPrice(item.priceSP)}
  //         </Text>
  //         <Text style={{color: '#1B2028', fontSize: 10}}>
  //           Đã bán {formatSoldSP(item.soldSP)}
  //         </Text>
  //       </View>
  //     </Pressable>
  //   );
  // };
  const renderSanpham = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
    const formatSoldSP = value => {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`; // Đơn vị "M" cho giá trị lớn hơn hoặc bằng 1,000,000
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`; // Đơn vị "k" cho giá trị lớn hơn hoặc bằng 1,000
      } else {
        return value.toString(); // Giữ nguyên giá trị nếu nhỏ hơn 1,000
      }
    };
    const formatPrice = priceSP => {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'symbol', // Để hiển thị ký hiệu đứng trước số
      });
      return `₫${priceSP.toLocaleString('vi-VN')}`;
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailProducts', {item})}
        style={{
          width: '50%',
          justifyContent: 'center',
          padding: '3%',
        }}>
        <Image
          style={{
            height: 200,
          }}
          source={{uri: item.imageSP}}
          resizeMode="contain"
        />
        <Text style={{color: '#1B2028', fontSize: 14}} numberOfLines={2}>
          {item.nameSP}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
            alignItems: 'center',
          }}>
          <Text style={{color: '#FC6D26', fontSize: 14}}>
            {formatPrice(item.priceSP)}
          </Text>
          <Text style={{color: '#1B2028', fontSize: 10}}>
            Đã bán {formatSoldSP(item.soldSP)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={sanpham}
        keyExtractor={item => item.id.toString()}
        renderItem={renderSanpham}
        numColumns={2}
        style={{marginBottom: 10}}
      />
    </View>
  );
};

export default Listproducts;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, Pressable, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {sanpham} from './data';

const Listproducts = () => {
  const [selectedItem, setSelectedItem] = useState(null);
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
      <Pressable
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
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={sanpham}
        keyExtractor={item => item.id}
        renderItem={renderSanpham}
        numColumns={2}
        style={{marginBottom: 10}}
      />
    </View>
  );
};

export default Listproducts;

const styles = StyleSheet.create({});

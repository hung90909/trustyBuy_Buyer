import {StyleSheet, Text, View, Pressable, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {formatPrice, formatSoldSP} from '../Format';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';

const Listproducts = ({count}) => {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const response = await apiGet(`${PRODUCT_API}/getAllProductByUser`);
      setProduct(response.message.allProduct);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const renderSanpham = ({item}) => {
    return (
      <Pressable
        onPress={() => handleProductPress(item._id)}
        style={styles.container}>
        <Image
          style={styles.imageSP}
          source={{
            uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}`,
          }}
          resizeMode="contain"
        />

        <Text style={styles.nameSp} numberOfLines={2}>
          {item.product_name}
        </Text>
        <View style={styles.containerGia}>
          <Text style={styles.giaSp}>{formatPrice(item.product_price)}</Text>
          <Text style={styles.daBan}>
            Đã bán {formatSoldSP(item.product_sold)}
          </Text>
        </View>
      </Pressable>
    );
  };
  const handleProductPress = productId => {
    navigation.navigate('DetailProducts', {productId});
    // console.log(productId);
    setSelectedProductId(productId);
  };
  return (
    <View>
      <FlatList
        data={product.filter(item => item._id !== selectedProductId)}
        scrollEnabled={false}
        keyExtractor={item => item?._id}
        renderItem={renderSanpham}
        numColumns={2}
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
    width: '100%',
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

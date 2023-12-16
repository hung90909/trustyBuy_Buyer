import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {API_BASE_URL, PRODUCT_API} from '../config/urls';
import {apiGet} from '../utils/utils';
import {formatPrice, formatSoldSP} from './Format';

const ListProduct = () => {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const getAllProduct = async () => {
    try {
      const response = await apiGet(`${PRODUCT_API}/getAllProductByUser`);

      if (response && response.message && response.message.allProduct) {
        const sortedProducts = response.message.allProduct.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });

        setProduct(sortedProducts);
        console.log(sortedProducts);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  const handleProductPress = productId => {
    navigation.navigate('DetailProducts', {productId});
    // console.log(productId);
    setSelectedProductId(productId);
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
  return (
    <View>
      <FlatList
        data={product}
        renderItem={renderSanpham}
        scrollEnabled={false}
        keyExtractor={item => item?._id}
        numColumns={2}
      />
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    justifyContent: 'center',
    padding: '3%',
    backgroundColor: 'white',
    marginRight: '1%',
    marginLeft: '1%',
  },
  imageSP: {
    width: '100%',
    height: 200,
  },
  nameSp: {
    color: '#1B2028',
    fontSize: 14,
    flex: 1,
    marginVertical: 5,
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
    flex: 1,
  },
  daBan: {
    color: '#1B2028',
    fontSize: 10,
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import {apiGet} from '../../utils/utils';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';
import {formatPrice, formatSoldSP} from '../Format';
import {useNavigation} from '@react-navigation/native';

const ListProductInCategory = ({route}) => {
  const navigation = useNavigation();
  const {categoryId} = route.params;
  const [productList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await apiGet(
          `${PRODUCT_API}/ofCategory/${categoryId}`,
        );
        setProductList(response?.message.allProduct || []);
      } catch (error) {
        console.error(error.response?.data);
      }
    };
    getProduct();
  }, [categoryId]);
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
        data={productList}
        scrollEnabled={false}
        keyExtractor={item => item?._id}
        renderItem={renderSanpham}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    width: '50%',
  },
  imageSP: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  nameSp: {
    color: '#1B2028',
    fontSize: 14,
    marginBottom: 4,
  },
  containerGia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default ListProductInCategory;

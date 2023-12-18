import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {API_BASE_URL, PRODUCT_API} from '../config/urls';
import {apiGet} from '../utils/utils';
import {formatPrice, formatSoldSP} from './Format';
import {Rating} from 'react-native-elements';

const ListProduct = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
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

        setProducts(sortedProducts);
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
    setSelectedProductId(productId);
  };

  const renderProduct = ({item}) => {
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

        <View style={styles.containerInfo}>
          <Text style={styles.priceSp}>{formatPrice(item.product_price)}</Text>

          <View style={styles.ratingContainer}>
            <Rating
              readonly
              startingValue={item?.product_ratingAverage}
              imageSize={10}
            />
            <Text style={styles.soldText}>
              Đã bán {formatSoldSP(item.product_sold)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProduct}
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
  },
  containerInfo: {
    marginTop: 10,
  },
  priceSp: {
    color: '#FC6D26',
    fontSize: 14,
    flex: 1,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  soldText: {
    color: '#1B2028',
    fontSize: 10,
  },
});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {apiGet} from '../../utils/utils';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';
import {formatPrice, formatSoldSP} from '../Format';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ListProductInCategory = ({route}) => {
  const navigation = useNavigation();
  const {categoryId, categoryName} = route.params;
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await apiGet(
          `${PRODUCT_API}/ofCategory/${categoryId}`,
        );
        const allProduct = response?.message?.allProduct;

        if (allProduct && allProduct.length > 0) {
          const sortedProducts = allProduct.sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA;
          });

          setProductList(sortedProducts);
        } else {
          console.log('No products found for the given category.');
        }
      } catch (error) {
        console.error(
          'Error fetching products:',
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [categoryId]);

  const handleProductPress = productId => {
    navigation.navigate('DetailProducts', {productId});
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
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.categoryTitle}>{categoryName}</Text>
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="black"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginTop: '80%',
            }}
          />
        ) : productList.length === 0 ? (
          <View style={styles.noProductsContainer}>
            <Text style={styles.noProductsText}>No products found.</Text>
          </View>
        ) : (
          <FlatList
            data={productList}
            keyExtractor={item => item?._id}
            renderItem={renderSanpham}
            numColumns={2}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    width: '50%',
    justifyContent: 'center',
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
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 16,
    color: '#1B2028',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  categoryTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default ListProductInCategory;

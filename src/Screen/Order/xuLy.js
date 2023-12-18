import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {API_BASE_URL, ORDER_API} from '../../config/urls';
import {apiGet, apiPatch} from '../../utils/utils';

export default function XuLy() {
  const nav = useNavigation();
  const [loading, setLoading] = useState(true);
  const [listProduct, setListProduct] = useState([]);

  const getAllOrderForUser = async () => {
    setLoading(true);
    try {
      const res = await apiGet(`${ORDER_API}/getAllOrderForUser/pending`);
      const sortedList = res.message.orderRes.user.sort((a, b) => {
        const dateA = new Date(a.crateDate);
        const dateB = new Date(b.crateDate);
        return dateB - dateA;
      });
      setListProduct(sortedList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllOrderForUser();
    }, []),
  );

  const onClickCancel = async id => {
    await apiPatch(`${ORDER_API}/cancelByUser/${id}`)
      .then(() => nav.navigate('DaHuy'))
      .catch(err => console.log(err));
  };

  const formatPrice = priceSP => {
    return `₫${priceSP.toLocaleString('vi-VN')}`;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : listProduct.length > 0 ? (
        <FlatList
          data={listProduct}
          keyExtractor={item => item.oderId}
          renderItem={({item}) => (
            <Pressable
              onPress={() => nav.navigate('DetailOrder', {item})}
              style={styles.itemOrder}>
              <View style={styles.orderInfoContainer}>
                <View style={styles.shopInfoContainer}>
                  <Image
                    style={styles.shopAvatar}
                    source={{uri: `${API_BASE_URL}${item.avatar_shop}`}}
                  />
                  <Text style={styles.shopName}>{item.name_shop}</Text>
                </View>
                <Text style={styles.orderStatus}>Chờ xác nhận</Text>
              </View>

              <View style={styles.productInfoContainer}>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: `${API_BASE_URL}uploads/${item.product_thumb[0]}`,
                  }}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.product_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={styles.productAttributes}>
                      <Text>
                        {item.color}
                        {item.product_attributes.color}
                      </Text>
                      <View style={styles.attributeSeparator}></View>
                      <Text>
                        {item.size}
                        {item.product_attributes.size}
                      </Text>
                    </View>
                    <Text>{item.product_attributes.quantity} sản phẩm</Text>
                  </View>

                  <Text style={styles.productTotal}>
                    {formatPrice(item.order_checkout.totalCheckout)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => onClickCancel(item.oderId)}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </Pressable>
          )}
        />
      ) : (
        <View style={styles.noOrderContainer}>
          <Image
            style={styles.noOrderImage}
            source={require('../../Resource/Image/order.png')}
          />
          <Text style={styles.noOrderText}>Chưa có đơn hàng</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemOrder: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  orderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  shopInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopAvatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  shopName: {
    marginLeft: 6,
    color: 'black',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  orderStatus: {
    color: 'black',
  },
  productInfoContainer: {
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  productName: {
    color: 'black',
    fontSize: 16,
  },
  productAttributes: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  attributeSeparator: {
    backgroundColor: 'black',
    width: 1,
    height: 10,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  productTotal: {
    color: 'red',
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'flex-end',
    margin: 10,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: 'white',
  },
  noOrderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrderImage: {
    width: 100,
    height: 100,
    tintColor: 'gray',
  },
  noOrderText: {
    fontSize: 20,
    marginTop: 10,
  },
});

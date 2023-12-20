import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {apiGet} from '../../utils/utils';
import {API_BASE_URL, ORDER_API} from '../../config/urls';

export default function DaGiao() {
  const nav = useNavigation();
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrderForUser = async () => {
    try {
      const res = await apiGet(`${ORDER_API}/getAllOrderForUser/delivered`);
      const sortedList = res.message.orderRes.user.sort(
        (a, b) => new Date(b.crateDate) - new Date(a.crateDate),
      );
      setListProducts(sortedList);
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

  const onBuyAgain = id => {
    fetch(`${API_BASE_URL}v1/api/checkout/cancelByUser/` + id, {
      method: 'PATCH',
      headers: {
        'x-xclient-id': '654c8a081f10540692bdc998',
        authorization: token,
      },
    })
      .then(() => nav.navigate('XuLy'))
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
      ) : listProducts.length > 0 ? (
        <FlatList
          data={listProducts}
          keyExtractor={item => item.oderId}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                nav.navigate('DetailOrder', {item});
              }}
              style={styles.itemOrder}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 20,
                    }}
                    source={{
                      uri: `${API_BASE_URL}` + item.avatar_shop,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      color: 'black',
                      fontSize: 14,
                      textTransform: 'uppercase',
                    }}>
                    {item.name_shop}
                  </Text>
                </View>
                <Text style={{color: 'black'}}>Đang giao</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                  }}
                  source={{
                    uri: `${API_BASE_URL}uploads/` + item.product_thumb[0],
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                    }}
                    numberOfLines={1}>
                    {item.product_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text>
                        {item.color}
                        {item.product_attributes.color}
                      </Text>
                      <View
                        style={{
                          backgroundColor: 'black',
                          width: 1,
                          height: 10,
                          marginHorizontal: 5,
                        }}></View>
                      <Text>{item.product_attributes.size}</Text>
                    </View>
                  </View>
                  <Text style={{color: 'red', marginTop: 5}}>
                    {formatPrice(item.order_checkout.totalCheckout)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}>
                {/* <TouchableOpacity style={styles.btnReturns}>
                  <Text style={{ color: 'black' }}>Yêu cầu trả hàng</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate('DetailProducts', {
                      productId: item.product_attributes.productId,
                    });
                  }}
                  style={styles.btn}>
                  <Text style={{color: 'white'}}>Mua lại</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              width: 100,
              height: 100,
              tintColor: 'gray',
            }}
            source={require('../../Resource/Image/order.png')}
          />
          <Text style={{fontSize: 20, marginTop: 10}}>Chưa có đơn hàng</Text>
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
  },
  btn: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  btnReturns: {
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    paddingVertical: 5,
    borderWidth: 1,
    alignSelf: 'center',
  },
});

import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {apiGet, apiPatch} from '../../utils/utils';
import {API_BASE_URL, ORDER_API} from '../../config/urls';

export default function DangGiao() {
  const nav = useNavigation();

  const getAllOrderForUser = async () => {
    try {
      const res = await apiGet(`${ORDER_API}/getAllOrderForUser/shipped`);
      const sortedList = res.message.orderRes.user.sort((a, b) => {
        // Assuming 'purchaseDate' is the property representing the order purchase date
        const dateA = new Date(a.crateDate);
        const dateB = new Date(b.crateDate);
        // Sort in descending order (newest first)
        return dateB - dateA;
      });
      setListProducts(sortedList);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllOrderForUser();
    }, []),
  );

  const onReceived = async id => {
    try {
      await apiPatch(`${ORDER_API}/changeStatusByUser`, {
        status: 'delivered',
        order_id: id,
      });
      nav.navigate('DaGiao');
    } catch (error) {
      console.log(error);
    }
  };

  const [listProducts, setListProducts] = useState([]);

  const formatPrice = priceSP => {
    return `₫${priceSP?.toLocaleString('vi-VN')}`;
  };

  return (
    <View style={styles.container}>
      {listProducts.length > 0 ? (
        <FlatList
          data={listProducts}
          keyExtractor={item => item.oderId}
          renderItem={({item}) => {
            return (
              <Pressable style={styles.itemOrder}>
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
                        <Text>
                          {item.size}
                          {item.product_attributes.size}
                        </Text>
                      </View>
                      <Text>{item.product_attributes.quantity} sản phẩm</Text>
                    </View>
                    <Text style={{color: 'red', marginTop: 5}}>
                      {formatPrice(item.order_checkout.totalCheckout)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    onReceived(item.oderId);
                  }}
                  style={styles.btn}>
                  <Text style={{color: 'white'}}>Đã nhận</Text>
                </TouchableOpacity>
              </Pressable>
            );
          }}
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
  itemOrder: {
    backgroundColor: 'white',
    marginVertical: 5,
  },
  btn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'flex-end',
    margin: 10,
    paddingVertical: 10,
  },
});

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
import {API_BASE_URL, ORDER_API} from '../../config/urls';
import {apiGet, apiPatch} from '../../utils/utils';

export default function XuLy() {
  const nav = useNavigation();

  const getAllOrderForUser = async () => {
    try {
      const res = await apiGet(`${ORDER_API}/getAllOrderForUser/pending`);
      const sortedList = res.message.orderRes.user.sort((a, b) => {
        // Assuming 'purchaseDate' is the property representing the order purchase date
        const dateA = new Date(a.crateDate);
        const dateB = new Date(b.crateDate);
        // Sort in descending order (newest first)
        return dateB - dateA;
      });
      setListProduct(sortedList);
      console.log(sortedList);
    } catch (error) {
      console.log(error);
    }
  };

  const [listProduct, setListProduct] = useState([]);

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
      {listProduct.length > 0 ? (
        <FlatList
          data={listProduct}
          keyExtractor={item => item.oderId}
          renderItem={({item}) => {
            return (
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
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
                  <Text style={{color: 'black'}}>Chờ xác nhận</Text>
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
                    onClickCancel(item.oderId);
                  }}
                  style={styles.btn}>
                  <Text style={{color: 'white'}}>Hủy</Text>
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

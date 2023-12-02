import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ORDER_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';

export default function DaGiao() {
  const getAllOrderForUser = async () => {
    try {
      const res = await apiGet(`${ORDER_API}/getAllOrderForUser/delivered`);
      setListProducts(res.message.orderRes.user);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllOrderForUser();
    }, []),
  );

  const [listProducts, setListProducts] = useState([]);

  const onBuyAgain = id => {
    fetch(
      'https://7324-116-96-44-199.ngrok-free.app/v1/api/checkout/cancelByUser/' +
        id,
      {
        method: 'PATCH',
        headers: {
          'x-xclient-id': '654c8a081f10540692bdc998',
          authorization: token,
        },
      },
    )
      .then(() => nav.navigate('XuLy'))
      .catch(err => console.log(err));
  };
  const formatPrice = priceSP => {
    return `₫${priceSP.toLocaleString('vi-VN')}`;
  };

  return (
    <View style={styles.container}>
      {listProducts.length > 0 ? (
        <FlatList
          data={listProducts}
          keyExtractor={item => item.oderId}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.itemOrder}>
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
                      // source={{
                      //   uri:
                      //     'https://158f-2a09-bac1-7aa0-50-00-246-66.ngrok-free.app/' +
                      //     item.avatar_shop,
                      // }}
                      source={{
                        // uri:
                        //   'https://19a5-2a09-bac1-7a80-50-00-17-25e.ngrok-free.app/uploads/' +
                        //   item.product_thumb[0],
                        uri: 'https://images2.thanhnien.vn/528068263637045248/2023/12/2/messi-1701497642597535849236.png',
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
                  <Text style={{color: 'black'}}>Đã giao</Text>
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
                      // uri:
                      //   'https://19a5-2a09-bac1-7a80-50-00-17-25e.ngrok-free.app/uploads/' +
                      //   item.product_thumb[0],
                      uri: 'https://images2.thanhnien.vn/528068263637045248/2023/12/2/messi-1701497642597535849236.png',
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
                        <Text>{item.color}Đen</Text>
                        <View
                          style={{
                            backgroundColor: 'black',
                            width: 1,
                            height: 10,
                            marginHorizontal: 5,
                          }}></View>
                        <Text>{item.size}XL</Text>
                      </View>
                      <Text>{item.product_attributes.quantity} sản phẩm</Text>
                    </View>
                    <Text style={{color: 'red', marginTop: 5}}>
                      {formatPrice(item.order_checkout.totalCheckout)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.btnReturns}>
                  <Text>Yêu cầu trả hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={{color: 'white'}}>Mua lại</Text>
                </TouchableOpacity>
              </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  itemOrder: {
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  btn: {
    width: 80,
    height: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  btnReturns: {
    width: 120,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

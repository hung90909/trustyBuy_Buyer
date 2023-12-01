import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {apiGet, apiPatch} from '../../utils/utils';
import {ORDER_API} from '../../config/urls';

export default function DangGiao() {
  const nav = useNavigation();

  const getAllOrderForUser = async () => {
    try {
      const res = await apiGet(`${ORDER_API}/getAllOrderForUser/shipped`);
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
              <TouchableOpacity style={styles.itemOrder}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 16,
                      }}
                      source={{
                        uri:
                          'https://158f-2a09-bac1-7aa0-50-00-246-66.ngrok-free.app/' +
                          item.avatar_shop,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 6,
                        color: 'black',
                      }}>
                      {item.name_shop}
                    </Text>
                  </View>
                  <Text>Đang giao</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Image
                    style={{
                      width: 80,
                      height: 90,
                    }}
                    source={{
                      uri:
                        'https://19a5-2a09-bac1-7a80-50-00-17-25e.ngrok-free.app/uploads/' +
                        item.product_thumb[0],
                    }}
                  />
                  <View style={{width: 200, marginLeft: 15}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                      numberOfLines={2}>
                      {item.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        width: 200,
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text>{item.color} | </Text>
                        <Text>{item.size}</Text>
                      </View>
                      <Text>{item.product_attributes.quantity} sản phẩm</Text>
                    </View>
                    <Text style={{color: 'red', marginTop: 5}}>
                      {formatPrice(item.order_checkout.totalCheckout)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        onReceived(item.oderId);
                      }}
                      style={styles.btn}>
                      <Text style={{color: 'white'}}>Đã nhận</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
    marginTop: 20,
    minHeight: 100,
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
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

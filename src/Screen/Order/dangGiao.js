import React, { useCallback, useState } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { apiGet, apiPatch } from '../../utils/utils';
import { API_BASE_URL, ORDER_API } from '../../config/urls';

const OrderItem = ({ nav, item, onReceived }) => {
  const formatPrice = priceSP => `₫${priceSP?.toLocaleString('vi-VN')}`;
   
  return (
    <Pressable
      onPress={() => nav.navigate('DetailOrder', { item })}
      style={styles.itemOrder}>
      <View style={styles.headerContainer}>
        <View style={styles.shopInfo}>
          <Image
            style={styles.shopAvatar}
            source={{ uri: `${API_BASE_URL}${item.avatar_shop}` }}
          />
          <Text style={styles.shopName}>{item.name_shop}</Text>
        </View>
        <Text style={styles.orderStatus}>Đang giao</Text>
      </View>

      <View style={styles.productInfo}>
        <Image
          style={styles.productImage}
          source={{ uri: `${API_BASE_URL}uploads/${item.product_thumb[0]}` }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.productName} numberOfLines={1}>
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: 'red', marginTop: 5, marginLeft: 6 }}>
              {formatPrice(item.order_checkout.totalCheckout)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          onReceived(item.oderId, {
            productId: item.product_attributes.productId,
            name: item.product_name,
            avatar: item.product_thumb[0],
          })
        }
        style={styles.receiveButton}>
        <Text style={styles.buttonText}>Đã nhận</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default function DangGiao() {
  const nav = useNavigation();
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrderForUser = async () => {
    try {
      const res = await apiGet(`${ORDER_API}/getAllOrderForUser/shipped`);
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

  const onReceived = async (id, data) => {
    try {
      await apiPatch(`${ORDER_API}/changeStatusByUser`, {
        status: 'delivered',
        order_id: id,
      });
      nav.navigate('DaGiao');
      nav.navigate('RatingComment', data);
    } catch (error) {
      console.log(error);
    }
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
          renderItem={({ item }) => (
            <OrderItem nav={nav} item={item} onReceived={onReceived} />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require('../../Resource/Image/order.png')}
          />
          <Text style={styles.emptyText}>Chưa có đơn hàng</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  shopInfo: {
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
  productInfo: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  productName: {
    color: 'black',
    fontSize: 16,
  },
  attributesContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  attributeDivider: {
    backgroundColor: 'black',
    width: 1,
    height: 10,
    marginHorizontal: 5,
  },
  quantityText: {
    color: 'black',
  },
  priceText: {
    color: '#FC6D26',
    marginTop: 5,
  },
  receiveButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'flex-end',
    margin: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 100,
    height: 100,
    tintColor: 'gray',
  },
  emptyText: {
    fontSize: 20,
    marginTop: 10,
  },
});

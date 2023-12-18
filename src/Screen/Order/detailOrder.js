import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { API_BASE_URL, DETAIL_ORDER } from '../../config/urls';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiGet } from '../../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default DetailOrder = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item)
  const nav = useNavigation();
  const [oderDetail, setoderDetail] = useState([]);
  const statusTranslations = {
    pending: 'Phê duyệt',
    shipped: 'Đang vận chuyển',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy',
  };
  const formatPrice = priceSP => {
    if (typeof priceSP === 'number') {
      return `₫${priceSP.toLocaleString('vi-VN')}`;
    } else {
      return 'Giá không hợp lệ';
    }
  };

  useEffect(() => {
    getDetailOrder();
  }, []);
  const formatDate = date => {
    function addLeadingZero(number) {
      return number < 10 ? `0${number}` : `${number}`;
    }
    const dateTimeObject = new Date(date);
    return `${dateTimeObject.getDate()}-${dateTimeObject.getMonth() + 1
      }-${dateTimeObject.getFullYear()} ${dateTimeObject.getHours()}:${addLeadingZero(
        dateTimeObject.getMinutes(),
      )}`;
  };

  const getDetailOrder = async () => {
    try {
      const response = await apiGet(`${DETAIL_ORDER}${item.oderId}`);

      setoderDetail(response.message.getTradeing[0]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginLeft: 10,
          alignItems: 'center',
          marginBottom: 10,
          elevation: 3,
        }}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#000000"
          onPress={() => nav.goBack()}
        />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={{ color: '#000000', fontWeight: '600', fontSize: 18 }}>
            Thông tin đơn hàng
          </Text>
        </View>
      </View>
      <View style={{ width: '100%', height: 50, alignItems: 'flex-end' }}>
        <View
          style={{
            width: 180,
            height: 50,
            backgroundColor: '#D3D3D3',
            justifyContent: 'center',
            marginRight: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: 'gray', padding: 5}}>
            Trạng thái: {statusTranslations[item.order_status]}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 10,
          padding: 10,
          backgroundColor: 'white',
          minHeight: 50,
          flexDirection: 'row',
        }}>
        <Image
          source={require('../../Resource/Image/placeholder.png')}
          style={{ height: 24, width: 24, marginRight: 10 }}
        />
        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Địa chỉ nhận hàng
          </Text>

          <Text>{item.order_shipping?.Home}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>{item.order_shipping?.Username} | </Text>
            <Text>
              {item.order_shipping?.Phonenumber
                ? `0${item.order_shipping.Phonenumber}`
                : ''}
            </Text>
          </View>

          <Text>{item.order_shipping?.Address}</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: 'white',
          minHeight: 100,
        }}>
        <TouchableOpacity
          onPress={() => {
            nav.navigate('ShopInformation', { shopId: item.shopId });
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              textTransform: 'uppercase',
            }}>
            {item.name_shop}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() =>{
          nav.navigate("DetailProducts",{productId:item.product_attributes.productId})
        }}
          style={{
            borderTopWidth: 0.5,
            borderColor: 'gray',
            flexDirection: 'row',
            padding: 10,
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
            }}
            source={{
              uri: `${API_BASE_URL}uploads/` + item.product_thumb[0],
            }}
          />
          <View>
            <Text
              style={{
                color: 'black',
              }}
              numberOfLines={1}>
              {item.product_name}
            </Text>
            <View style={{flexDirection:"row", marginTop:4}}>
               <Text>{item.product_attributes.color} |</Text>
               <Text> {item.product_attributes.size}</Text>
            </View>
            <Text style={{ color: 'black', marginVertical: 5 }}>
              x{item.product_attributes.quantity}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: 'red', marginTop: 2 }}>
                {formatPrice(item.order_checkout.totalCheckout)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 13 }}>
          Thời gian đặt hàng: {formatDate(item.crateDate)}{' '}
        </Text>
      </View>
      <View style={{
        width: '100%', backgroundColor:"white", marginTop:10,
        padding:10
      }}>
        <Text style={{fontWeight:"bold", fontSize:15,color:"black"}}>Phương thức thanh toán</Text>
        <Text style={{marginTop:5}}>{oderDetail.order_payment}</Text>
      </View>
    </View>
  );
};

import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { formatPrice, formatSoldSP } from '../Format';
import {
  ADD_CART_API,
  API_BASE_URL,
  DISCOUNT_API,
  GET_ADDRESS_API,
  PRODUCT_API,
} from '../../config/urls';
import { apiGet, apiPost } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { RadioButton } from 'react-native-paper';

const ListDiscount = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { orderDetails, itemAddress, shopId } = route.params;
  const [listVoucher, setListVoucher] = useState([]);
  const [checked, setChecked] = useState(null);

  const getDisCount = async () => {
    try {
      const res = await apiGet(DISCOUNT_API + `/${shopId}`);
      setListVoucher(res.message);
      // console.log(res.message);
    } catch (error) {
      throw error;
    }
  };
  const formatPrice = priceSP => {
    if (typeof priceSP === 'number') {
      return `₫${priceSP.toLocaleString('vi-VN')}`;
    } else {
      return 'Giá không hợp lệ';
    }
  };
  useEffect(() => {
    getDisCount();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: 'white',
          elevation: 4,
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <Ionicons name="arrow-back-outline" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 20 }}>Chọn Voucher</Text>
      </View>
      {listVoucher.length > 0 ? <FlatList
        data={listVoucher}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                minHeight: 80,
                backgroundColor: 'white',
                marginTop: 20,
                flexDirection: 'row',
                padding: 5,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 1,
                }}
                source={{
                  uri: `${API_BASE_URL}` + item.thumb,
                }}
              />
              <View style={{ width: '60%' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 18,
                  }}>
                  {item.discount_name}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Đơn tối thiểu {formatPrice(item.discount_min_order_value)}
                </Text>
                <Text>Giảm giá {item.discount_value}%</Text>
              </View>

              <RadioButton
                value={item._id} // Giá trị của nút radio
                status={checked === item._id ? 'checked' : 'unchecked'} // Trạng thái của nút radio
                onPress={() => {
                  setChecked(item._id);
                  nav.navigate("Checkout", {
                    itemDiscount: item,
                    orderDetails: orderDetails,
                    itemAddress: itemAddress,
                  });
                }}
              />
            </TouchableOpacity>
          );
        }}
      /> :
        <View style={{justifyContent:"center", alignItems:"center",
         flex:1}}>
          <Image style={{
            width:100, height:100 , tintColor:"gray"
          }} source={require("../../Resource/icon/disc.png")}/>
           <Text style={{fontSize:20}}>
               Không có mã voucher
           </Text>
        </View>}
    </View>
  );
};

export default ListDiscount;

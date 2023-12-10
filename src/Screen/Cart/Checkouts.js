import React, {useCallback, useEffect, useState, useRef} from 'react';
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
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {formatPrice, formatSoldSP} from '../Format';
import {
  ADD_CART_API,
  API_BASE_URL,
  CHECKOUT_API,
  DISCOUNT_API,
  GET_ADDRESS_API,
  ORDERS_API,
  PRODUCT_API,
} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-virtualized-view';


const Checkouts = ({ navigation }) => {
    const nav = useNavigation()
    const route = useRoute()
    const { item, itemAddress, itemDiscount } = route.params
    const [address, setAddress] = useState({})
    const [user, setUser] = useState({})
    const [cartid, setCartid] = useState('')
    const formatPrice = priceSP => {
        if (typeof priceSP === 'number') {
            return `₫${priceSP.toLocaleString('vi-VN')}`;
        } else {
            return 'Giá không hợp lệ';
        }
    };
    const totalPrice = (price, quantity) => {
        return formatPrice(price * quantity)
    }
  const getCartID = async () => {
    try {
      const res = await apiGet(ADD_CART_API);
      setCartid(res.message.cart._id);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPriceBill = () => {
    // Tính tổng giá trị các sản phẩm trong đơn hàng
    const total = item?.reduce(
      (total, item) => item.price * item.quantity + total,
      0,
    );

    if (itemDiscount) {
      const discountAmount = total * (itemDiscount.discount_value / 100);
      const totalBill = total - discountAmount;
      return formatPrice(totalBill);
    }
    return formatPrice(total);
  };
  const totalDisCount = () => {
    const total = item?.reduce(
      (total, item) => item.price * item.quantity + total,
      0,
    );
    const discountAmount = total * (itemDiscount.discount_value / 100);
    return formatPrice(discountAmount);
  };

  const getAllAddress = async () => {
    try {
      const res = await apiGet(GET_ADDRESS_API);
      setAddress(res.message.information.address[0]);
    } catch (error) {
      throw error;
    }
  };
  const getUser = async () => {
    try {
      const res = await apiGet(GET_ADDRESS_API);
      setUser(res.message.information);
    } catch (error) {
      throw error;
    }
  };

  const onOrders = async () => {
    const data = {
      cartId: cartid,
      shop_order_ids: item.map(item => ({
        shopId: item.shopId,
        shop_discounts: [
          {
            shop_id: itemDiscount?.discount_shopId,
            discountId: itemDiscount?._id,
            codeId: itemDiscount?.discount_code,
          },
        ],
        item_products: [
          {
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            color: item.color,
            size: item.size,
          },
        ],
      })),
    };

    try {
      // console.log(data)
      const res = await apiPost(ORDERS_API, data);
      if (res.message) {
        console.log(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCartID();
    getAllAddress();
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              nav.goBack();
            }}>
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
          <Text style={{fontSize: 20, marginLeft: 20}}>Thanh toán</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            nav.navigate('ListAddress', {
              itemProduct: item,
              itemDiscount: itemDiscount,
            });
          }}
          style={{
            backgroundColor: 'white',
            marginTop: 20,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="location-outline" size={20} />
              <Text style={{marginLeft: 10}}>Địa chỉ nhận hàng</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginLeft: 30, width: '80%'}}>
                {user.fullName} | 0{user.phoneNumber}
              </Text>
            </View>
            <View style={{marginLeft: 30, width: '80%'}}>
              <Text>
                {itemAddress
                  ? itemAddress.customAddress
                  : address.customAddress}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward-outline" size={30} />
        </TouchableOpacity>
        <View style={{marginTop: 10, paddingHorizontal: 10}}>
          <FlatList
            data={item}
            keyExtractor={item => item.itemId}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    marginTop: 8,
                    padding: 10,
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Image
                      style={{
                        width: 90,
                        height: 80,
                      }}
                      source={{
                        uri:
                          'https://b0aa-116-96-44-199.ngrok-free.app/uploads/' +
                          item.product_thumb,
                      }}
                    />
                    <View style={{marginStart: 10}}>
                      <Text
                        style={{fontSize: 15, color: 'black', width: '70%'}}
                        numberOfLines={1}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '65%',
                          marginTop: 40,
                        }}>
                        <Text>{formatPrice(item.price)}</Text>
                        <Text>x{item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'black'}}>Voucher khuyển mãi : </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{}}>Chọn hoặc nhập mã </Text>
                      <Ionicons name="chevron-forward-outline" size={25} />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>
                      Tổng số tiền:{' '}
                    </Text>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>
                      {totalPrice(item.price, item.quantity)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              nav.navigate('ListDiscount', {
                itemProduct: item,
                itemAddress: itemAddress,
              });
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>
              Voucher khuyến mãi
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {itemDiscount ? (
                <Text>Giảm {itemDiscount.discount_value}%</Text>
              ) : (
                <Text style={{}}>Chọn hoặc nhập mã </Text>
              )}
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>
              Phương thức thanh toán
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text numberOfLines={1} style={{width: '60%'}}>
                Thanh toán khi nhận hàng{' '}
              </Text>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 15, marginTop: 20, marginBottom: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Chi tiết thanh toán
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>Tổng tiền hàng: </Text>
            <Text style={{fontSize: 16}}>{totalPriceBill()}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>Tổng khuyến mãi: </Text>
            {itemDiscount ? (
              <Text style={{fontSize: 16}}>{totalDisCount()}</Text>
            ) : (
              <Text style={{fontSize: 16}}>0</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>Tổng tiền hàng: </Text>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
              {totalPriceBill()}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: 60,
          backgroundColor: 'white',
          borderTopWidth: 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Tổng thanh toán:{' '}
          </Text>
          <Text
            style={{
              marginLeft: 5,
              color: 'red',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {totalPriceBill()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onOrders();
          }}
          style={{
            flex: 1,
            height: 60,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
        }
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    elevation: 2,
    paddingHorizontal: 15,
  },
});
export default Checkouts;

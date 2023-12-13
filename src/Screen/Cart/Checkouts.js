import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiGet, apiPost} from '../../utils/utils';
import {
  ADD_CART_API,
  API_BASE_URL,
  CHECKOUT_API,
  DISCOUNT_API,
  GET_ADDRESS_API,
  ORDERS_API,
  PRODUCT_API,
} from '../../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-virtualized-view';
import {formatPrice} from '../Format';

const Checkouts = ({navigation}) => {
  const nav = useNavigation();
  const route = useRoute();
  const {item, itemAddress, itemDiscount} = route.params;
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState({});
  const [user, setUser] = useState({});
  const [cartId, setCartId] = useState('');
  const [totalProduct, setTotalProduct] = useState('');

  const Checkouts = ({navigation}) => {
    const nav = useNavigation();
    const route = useRoute();
    const {item, itemAddress, itemDiscount} = route.params;
    const [address, setAddress] = useState({});
    const [user, setUser] = useState({});
    const [cartid, setCartid] = useState('');
    const [userId, setUserId] = useState('');
    const [totalProduct, setTotalProduct] = useState('');

    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      const tokenUser = token ? JSON.parse(token) : null;
      setUserId(tokenUser.userId);
    }

    useEffect(() => {
      getToken();
    }, []);

    const formatPrice = priceSP => {
      if (typeof priceSP === 'number') {
        return `₫${priceSP.toLocaleString('vi-VN')}`;
      } else {
        return 'Giá không hợp lệ';
      }
    };
    const totalPrice = (price, quantity) => {
      setTotalProduct(price * quantity);
      return formatPrice(price * quantity);
    };
  };
  const totalPrice = (price, quantity) => {
    setTotalProduct(price * quantity);
    return formatPrice(price * quantity);
  };

  const getCartID = async () => {
    try {
      const res = await apiGet(ADD_CART_API);
      setCartId(res.message.cart._id);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPriceBill = () => {
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

  const totalDiscount = () => {
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
      //    userId:"654c8a081f10540692bdc998",
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
      const res = await apiPost(ORDERS_API, data);
      // Kiểm tra xem có thông báo từ server hay không
      if (res.message) {
        //  console.log(res.message);
        // Hiển thị thông báo cho người dùng, ví dụ sử dụng alert
        Alert.alert('Thông báo', res.message);
      }
    } catch (error) {
      // Nếu có lỗi, lấy thông báo từ đối tượng lỗi và hiển thị cho người dùng
      const errorMessage = error.message || 'Có lỗi xảy ra khi xử lý đơn hàng.';
      // console.error(errorMessage);
      // Hiển thị thông báo lỗi cho người dùng, ví dụ sử dụng alert
      Alert.alert('Thông báo loi', errorMessage);
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

        {itemAddress ? (
          <TouchableOpacity
            onPress={() => {
              nav.navigate('ListAddress', {
                itemProduct: item,
                itemDiscount: itemDiscount,
              });
            }}
            style={styles.addressSection}>
            <View style={styles.addressDetails}>
              <Ionicons name="location-outline" size={20} />
              <Text style={{marginLeft: 10}}>Địa chỉ nhận hàng</Text>
            </View>
            <View style={styles.addressInfo}>
              <Text>
                {user.fullName} | 0{user.phoneNumber}
              </Text>
              <Text>
                {itemAddress
                  ? itemAddress.customAddress
                  : address.customAddress}
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              nav.navigate('AdressScreen');
            }}
            style={styles.addressSection}>
            <Text>Thêm địa chỉ</Text>
            <Ionicons style={{marginLeft: 5}} name="add-outline" size={20} />
          </TouchableOpacity>
        )}

        <View style={styles.productListSection}>
          <FlatList
            data={item}
            keyExtractor={item => item.itemId}
            renderItem={({item}) => (
              <View style={styles.productItem}>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: `${API_BASE_URL}uploads/` + item.product_thumb,
                  }}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.priceAndQuantity}>
                    <Text>{formatPrice(item.price)}</Text>
                    <Text>x{item.quantity}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.voucherContainer}>
                  <Text style={styles.voucherText}>Voucher khuyến mãi : </Text>
                  <View style={styles.voucherDetails}>
                    <Text>Chọn hoặc nhập mã </Text>
                    <Ionicons name="chevron-forward-outline" size={25} />
                  </View>
                </TouchableOpacity>
                <View style={styles.totalPriceContainer}>
                  <Text style={styles.totalPriceLabel}>Tổng số tiền: </Text>
                  <Text style={styles.totalPrice}>
                    {totalPrice(item.price, item.quantity)}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        <View style={styles.paymentSection}>
          <TouchableOpacity
            onPress={() => {
              nav.navigate('ListDiscount', {
                itemProduct: item,
                itemAddress: itemAddress,
                totalProduct: totalProduct,
              });
            }}
            style={styles.discountContainer}>
            <Text style={styles.discountText}>Voucher khuyến mãi</Text>
            <View style={styles.discountDetails}>
              {itemDiscount ? (
                <Text>Giảm {itemDiscount.discount_value}%</Text>
              ) : (
                <Text style={{}}>Chọn hoặc nhập mã </Text>
              )}
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethodContainer}>
            <Text style={styles.paymentMethodText}>Phương thức thanh toán</Text>
            <View style={styles.paymentMethodDetails}>
              <Text numberOfLines={1} style={styles.paymentMethod}>
                Thanh toán khi nhận hàng
              </Text>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentDetailsSection}>
          <Text style={styles.paymentDetailsLabel}>Chi tiết thanh toán</Text>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailLabel}>Tổng tiền hàng: </Text>
            <Text style={styles.paymentDetailValue}>{totalPriceBill()}</Text>
          </View>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailLabel}>Tổng khuyến mãi: </Text>
            {itemDiscount ? (
              <Text style={styles.paymentDetailValue}>{totalDiscount()}</Text>
            ) : (
              <Text style={styles.paymentDetailValue}>0</Text>
            )}
          </View>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailLabel}>Tổng tiền hàng: </Text>
            <Text style={styles.paymentDetailValue}>{totalPriceBill()}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalPayment}>
          <Text style={styles.totalPaymentLabel}>Tổng thanh toán: </Text>
          <Text style={styles.totalPaymentValue}>{totalPriceBill()}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onOrders();
          }}
          style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  addressSection: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressDetails: {
    flexDirection: 'row',
  },
  addressInfo: {
    marginLeft: 30,
    width: '80%',
  },
  productItem: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  productImage: {
    width: 90,
    height: 80,
  },
  productDetails: {
    marginStart: 10,
  },
  productName: {
    fontSize: 15,
    color: 'black',
    width: '70%',
  },
  priceAndQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    marginTop: 40,
  },
  voucherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  voucherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  totalPriceLabel: {
    fontWeight: 'bold',
    color: 'black',
  },
  totalPrice: {
    color: 'red',
    fontWeight: 'bold',
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 16,
    color: 'black',
  },
  discountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    color: 'black',
  },
  paymentMethodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethod: {
    width: '60%',
  },
  paymentDetailsSection: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  paymentDetailsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  paymentDetail: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  paymentDetailLabel: {
    fontSize: 16,
  },
  paymentDetailValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  footer: {
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  totalPayment: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  totalPaymentLabel: {
    fontSize: 13,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPaymentValue: {
    marginLeft: 5,
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderButton: {
    flex: 1,
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Checkouts;

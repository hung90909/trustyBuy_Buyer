import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_BASE_URL, ORDERS_API } from '../config/urls';
import { formatPrice } from './Format';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { apiPost } from '../utils/utils';
import paypalApi from '../config/paypalApi';
import WebView from 'react-native-webview';
import queryString from 'query-string';
const CheckoutScreen = ({ route }) => {
  const { orderDetails, itemDiscount } = route.params;

  const product = orderDetails;

  // console.log("discount: " + itemDiscount.discount_value)

  // product.map(item =>{
  //   if(item.product.shopId === itemDiscount?.discount_shopId){
  //     console.log("giam")
  //   }else{
  //     console.log("ko giam")
  //   }

  // })
  const navigation = useNavigation();
  const address = useSelector(state => state?.address?.addressData);
  const [data, setData] = useState(address);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false); // Assuming you have 'open' state
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [isCheckVoucher, setIsCheckVoucher] = useState(false)

  const pay = [
    { label: 'Thanh toán khi nhận hàng', value: 'Thanh toán khi nhận hàng' },
    { label: 'Thanh toán bằng PayPal', value: 'Thanh toán bằng PayPal' },
  ];
  useEffect(() => {
    setData(address);
  }, [address]);


  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };
  const isDataOrValueNull = data === null || value === '';
  const totalPrice = () => {
    let total = 0;
    product.map(item => {
      total += item.product.price * item.product.quantity;
    });
    return formatPrice(total);
  };
  const convertToUSD = amountInVND => {
    const exchangeRate = 24000;
    return (amountInVND / exchangeRate).toFixed(2);
  };
  const totalPriceBill = () => {
    let total = 0;
    product.map(item => {
      total += item.product.price * item.product.quantity;
    });

    if (itemDiscount) {
      const discountAmount = total * (itemDiscount.discount_value / 100);
      const totalBill = total - discountAmount;
      return formatPrice(totalBill);
    }
    return formatPrice(total);
  };
  const totalDiscount = () => {
    const total = orderDetails?.reduce(
      (total, item) => item.product.price * item.product.quantity + total,
      0,
    );
    const discountAmount = total * (itemDiscount.discount_value / 100);
    return formatPrice(discountAmount);
  };
  const orderDetail = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        items: product.map(item => ({
          name: item.product.name,
          description: 'Trusty Buy',
          quantity: item.product.quantity,
          unit_amount: {
            currency_code: 'USD',
            value: convertToUSD(item.product.price),
          },
        })),
        amount: {
          currency_code: 'USD',
          value: product
            .reduce((total, currentItem) => {
              const itemTotal =
                convertToUSD(currentItem.product.price) *
                currentItem.product.quantity;
              return total + itemTotal;
            }, 0)
            .toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: product
                .reduce((total, currentItem) => {
                  const itemTotal =
                    convertToUSD(currentItem.product.price) *
                    currentItem.product.quantity;
                  return total + itemTotal;
                }, 0)
                .toFixed(2),
            },
          },
        },
      },
    ],
    application_context: {
      return_url: 'https://example.com/return',
      cancel_url: 'https://example.com/cancel',
    },
  };

  const groupProductsByShop = products => {
    const groupedProducts = {};
    products.forEach(product => {
      const shopId = product.product.shopId;
      if (!groupedProducts[shopId]) {
        groupedProducts[shopId] = [];
      }
      groupedProducts[shopId].push(product);
    });
    return groupedProducts;
  };

  const groupedProducts = groupProductsByShop(orderDetails);

  const onOrders = useCallback(async () => {
    const shopOrderData = route.params.orderDetails.map(item => ({
      shopId: item.product.shopId,
      shop_discounts: [
        {
          shop_id: itemDiscount?.discount_shopId,
          discountId: itemDiscount?._id,
          codeId: itemDiscount?.discount_code,
        },
      ],
      item_products: [
        {
          price: item.product.price,
          quantity: item.product.quantity,
          productId: item.product.productId,
          color: item.product.color,
          size: item.product.size,
        },
      ],
    }));

    const orderData = {
      shop_order_ids: shopOrderData,
      user_address: {
        Home: data?.nameAddress,
        Address: data?.customAddress,

        Username: data?.userinfor?.userName,

        Phonenumber: data?.userinfor?.phoneNumber,
      },
      user_payment: value,
    };
    setOrderData(orderData);

    try {
      if (value === 'Thanh toán khi nhận hàng') {
        // Display a confirmation dialog before proceeding with the order
        Alert.alert(
          'Xác nhận mua hàng',
          'Bạn có chắc chắn muốn đặt hàng?',
          [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            {
              text: 'Đồng ý',
              onPress: async () => {
                // If user agrees, proceed with the order
                const res = await apiPost(ORDERS_API, orderData);
                navigation.navigate('TabOrder');
              },
            },
          ],
          { cancelable: false },
        );
      } else if (value === 'Thanh toán bằng PayPal') {
        try {
          const token = await paypalApi.generateToken();
          const { links } = await paypalApi.createOrder(token, orderDetail);

          setAccessToken(token);

          if (links) {
            const approvalLink = links.find(link => link?.rel === 'approve');
            setPaypalUrl(approvalLink?.href);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [value, data, orderData, navigation, itemDiscount, product]);
  const onUrlChange = webviewState => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }

    if (
      webviewState.url.includes('https://example.com/return') &&
      !paymentProcessed
    ) {
      const { token } = queryString.parseUrl(webviewState.url).query;

      if (token) {
        setPaymentProcessed(true); // Set the flag to true to indicate payment has been processed
        paymentSuccess(token);
      }
    }
  };

  const paymentSuccess = async id => {
    if (paymentProcessed) {
      return;
    }

    try {
      const response = await paypalApi.capturePayment(id, accessToken);
      ToastAndroid.show('Thanh toán thành công đơn hàng', ToastAndroid.SHORT);
      setPaymentProcessed(true);
      clearPaypalState();
      const res = await apiPost(ORDERS_API, orderData);
      navigation.navigate('TabOrder');
    } catch (error) {
      console.error('Error capturing payment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={styles.titleHeader}>Thanh toán</Text>
        </View>
      </View>

      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <Pressable
            style={{
              justifyContent: 'center',
              paddingVertical: 10,
            }}
            onPress={() => navigation.navigate('OptionAddress')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../Resource/Image/placeholder.png')}
                  style={{ height: 24, width: 24, marginRight: 10 }}
                />

                <View style={{ width: '90%' }}>
                  <Text
                    style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>
                    Địa chỉ nhận hàng
                  </Text>
                  {data ? (
                    <View>
                      <Text>{data?.nameAddress}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text>{data?.userinfor?.userName} | </Text>
                        <Text>
                          {address?.userinfor?.phoneNumber
                            ? `0${address.userinfor.phoneNumber}`
                            : ''}
                        </Text>
                      </View>

                      <Text>{data?.customAddress}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text>Vui lòng chọn địa chỉ</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Pressable>
        </View>
        {Object.keys(groupedProducts).map(shopId => (
          <View style={{ flex: 1 }} key={shopId}>
            <ScrollView>
              <View style={styles.content}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}>
                    {groupedProducts[shopId][0].product.nameShop}
                  </Text>
                </View>
                {groupedProducts[shopId].map((value, index) => {
                  const item = value.product;
                  return (
                    <View style={styles.productContainer} key={index}>
                      <Image
                        source={{
                          uri: `${API_BASE_URL}uploads/${item.thumb}`,
                        }}
                        style={styles.productImage}
                      />
                      <View style={styles.productDetails}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <View style={styles.productOptions}>
                          <Text style={styles.productOption}>{item.color}</Text>
                          <Text style={styles.separator}>|</Text>
                          <Text style={styles.productOption}>{item.size}</Text>
                        </View>
                        <View style={styles.priceQuantityContainer}>
                          <Text style={styles.productPrice}>
                            {formatPrice(item.price)}
                          </Text>
                          <Text style={styles.productQuantity}>
                            x {item.quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}

                <Pressable
                  onPress={() =>
                    navigation.navigate('ListDiscount', {
                      shopId: groupedProducts[shopId][0].product.shopId,
                      orderDetails: orderDetails,
                      itemAddress: address,
                      dataProduct: itemDiscount || [],
                    })
                  }>
                  <View style={styles.voucherContainer}>
                    <Text style={styles.voucherText}>Voucher của shop</Text>
                    <View style={styles.voucherInputContainer}>

                      {product.map((item, index) => {
                        const isDiscountApplied = itemDiscount?.discount_shopId === item.product.shopId;
                        return (
                          <View key={index}>
                            {isDiscountApplied && <Text>Giảm {itemDiscount.discount_value}%</Text>}
                          </View>
                        )
                      })}
                      <MaterialIcons
                        name="navigate-next"
                        size={30}
                        color="black"
                      />
                    </View>
                  </View>
                </Pressable>

                <View style={styles.totalPriceContainer}>
                  <Text style={styles.totalPriceText}>
                    Tổng tiền (
                    {groupedProducts[shopId].reduce(
                      (total, value) => total + value.product.quantity,
                      0,
                    )}{' '}
                    sản phẩm) :
                  </Text>
                  <Text style={styles.totalPriceAmount}>
                    {formatPrice(
                      groupedProducts[shopId].reduce(
                        (acc, value) =>
                          acc + value.product.price * value.product.quantity,
                        0,
                      ),
                    )}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        ))}

        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
              borderRadius: 10,
            }}>
            <Text style={{ color: 'black', fontSize: 15 }}>
              Phương thức thanh toán
            </Text>
            <Dropdown
              style={styles.dropdown}
              data={pay}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder=""
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
            />
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
            Chi tiết thanh toán
          </Text>
          <View style={{ marginVertical: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.chitietThanhtoan}>Tổng tiền hàng:</Text>
              <Text style={styles.chitietThanhtoan}>{totalPrice()}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={styles.chitietThanhtoan}>Tiền khuyến mãi:</Text>
              {itemDiscount ? (
                <Text style={styles.chitietThanhtoan}>{totalDiscount()}</Text>
              ) : (
                <Text style={styles.chitietThanhtoan}>0</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.chitietThanhtoan}>Tổng tiền hàng:</Text>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {totalPriceBill()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/*  */}
      <View
        style={{
          height: 60,
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1, paddingLeft: 100 }}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
            Tổng thanh toán:
          </Text>
          <Text
            style={{
              color: '#FC6D26',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {totalPriceBill()}
          </Text>
        </View>

        <Pressable
          style={{
            height: 60,
            justifyContent: 'center',
            backgroundColor: isDataOrValueNull ? '#EEEEEE' : 'black',
            flex: 1,
          }}
          disabled={isDataOrValueNull}
          onPress={() => {
            !isDataOrValueNull && onOrders();
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: isDataOrValueNull ? '#CCCCCC' : 'white',
              fontSize: 16,
            }}>
            Đặt hàng
          </Text>
        </Pressable>
      </View>
      <Modal visible={!!paypalUrl}>
        <TouchableOpacity
          onPress={clearPaypalState}
          style={{ marginTop: 20, marginLeft: 20 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: paypalUrl }}
            onNavigationStateChange={onUrlChange}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  content: {
    borderColor: 'gray',
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    flex: 1,
    margin: 10,
  },
  productName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  productOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  productOption: {
    fontSize: 12,
  },
  separator: {
    backgroundColor: 'gray',
    width: 1,
    height: 10,
    marginHorizontal: 8,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 16,
    color: '#FC6D26',
    fontWeight: 'bold',
  },
  productQuantity: {
    color: 'black',
  },
  voucherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  voucherText: {
    color: 'black',
    fontSize: 15,
  },
  voucherInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalPriceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  totalPriceAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FC6D26',
  },
  dropdown: {
    marginVertical: 10,
    height: 50,
    borderBottomColor: 'gray',
    backgroundColor: 'white',
    borderColor: 'black', // Add this line for border color
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 8,
  },
});

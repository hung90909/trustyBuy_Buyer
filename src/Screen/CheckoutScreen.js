import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {API_BASE_URL, ORDERS_API} from '../config/urls';
import {formatPrice} from './Format';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {apiPost} from '../utils/utils';
const CheckoutScreen = ({route}) => {
  const {orderDetails, itemDiscount} = route.params;
  const product = orderDetails;
  const navigation = useNavigation();
  const address = useSelector(state => state?.address?.addressData);
  const [data, setData] = useState(address);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false); // Assuming you have 'open' state
  console.log(route.params.orderDetails);
  const pay = [
    {label: 'Thanh toán khi nhận hàng', value: 'Thanh toán khi nhận hàng'},
    {label: 'Thanh toán bằng PayPal', value: 'Thanh toán bằng PayPal'},
  ];
  useEffect(() => {
    setData(address);
  }, [address]);
  const isDataOrValueNull = data === null || value === '';
  const totalPrice = (price, quantity) => {
    return formatPrice(price * quantity);
  };

  const totalPriceBill = item => {
    const total = item.price * item.quantity;

    if (itemDiscount) {
      const discountAmount = total * (itemDiscount.discount_value / 100);
      const totalBill = total - discountAmount;
      return formatPrice(totalBill);
    }
    return formatPrice(total);
  };

  const totalDiscount = arr => {
    const total = 0;
    arr.forEach(item => {
      total += item.product.price * item.product.quantity;
    });

    const discountAmount = total * (itemDiscount.discount_value / 100);
    return formatPrice(discountAmount);
  };

  const onOrders = async () => {
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
        City: data.customAddress,
      },
      user_payment: value,
    };

    try {
      const res = await apiPost(ORDERS_API, orderData);
      navigation.navigate('TabOrder');
    } catch (error) {
      console.log(error);
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
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.titleHeader}>Thanh toán</Text>
        </View>
      </View>

      <View style={{paddingHorizontal: 20}}>
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
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../Resource/Image/placeholder.png')}
                style={{height: 24, width: 24, marginRight: 10}}
              />

              <View style={{width: '90%'}}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  Địa chỉ nhận hàng
                </Text>
                {data ? (
                  <View>
                    <Text>{data?.nameAddress}</Text>
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
      {product &&
        product.map((value, index) => {
          const item = value.product;
          return (
            <View style={{flex: 1}} key={index}>
              <ScrollView style={{paddingHorizontal: 20}}>
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
                        textTransform: 'uppercase', // Thêm dòng này để viết in hoa
                      }}>
                      {item.nameShop}
                    </Text>
                  </View>

                  <View style={styles.productContainer}>
                    <Image
                      source={{
                        uri: `${API_BASE_URL}uploads/${item.thumb[0]}`,
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

                  <Pressable>
                    <View style={styles.voucherContainer}>
                      <Text style={styles.voucherText}>Voucher của shop</Text>
                      <View style={styles.voucherInputContainer}>
                        {itemDiscount ? (
                          <Text>Giảm {itemDiscount.discount_value}%</Text>
                        ) : (
                          <Text style={{}}>Chọn hoặc nhập mã </Text>
                        )}
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
                      Tổng tiền ({item ? item.quantity : 0} sản phẩm) :
                    </Text>
                    <Text style={styles.totalPriceAmount}>
                      {totalPrice(item.price, item.quantity)}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: 1,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 15}}>
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
                    itemTextStyle={{fontSize: 14}}
                    selectedTextStyle={{fontSize: 14}}
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    Chi tiết thanh toán
                  </Text>
                  <View style={{marginVertical: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.chitietThanhtoan}>
                        Tổng tiền hàng:
                      </Text>
                      <Text style={styles.chitietThanhtoan}>
                        {totalPrice(item.price, item.quantity)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 5,
                      }}>
                      <Text style={styles.chitietThanhtoan}>
                        Tiền khuyến mãi:
                      </Text>
                      <Text style={styles.chitietThanhtoan}>
                        <Text>0</Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.chitietThanhtoan}>
                        Tổng tiền hàng:
                      </Text>
                      <Text style={{fontWeight: 'bold', color: 'black'}}>
                        {totalPriceBill(item)}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  height: 60,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1, paddingLeft: 100}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
                    Tổng thanh toán:
                  </Text>
                  <Text
                    style={{
                      color: '#FC6D26',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {totalPriceBill(item)}
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
            </View>
          );
        })}
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
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

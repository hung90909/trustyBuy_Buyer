import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {API_BASE_URL} from '../config/urls';
import {formatPrice} from './Format';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {Pressable} from 'react-native';
import {saveAddressData} from '../redux/actions/address';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
const CheckoutScreen = ({route}) => {
  const {orderDetails} = route.params;
  const product = orderDetails.product;
  const navigation = useNavigation();
  const address = useSelector(state => state?.address?.addressData);
  const [data, setData] = useState(address);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false); // Assuming you have 'open' state
  const pay = [
    {label: 'Thanh toán khi nhận hàng', value: 'Cash'},
    {label: 'Thanh toán bằng PayPal', value: 'PayPal'},
  ];
  useEffect(() => {
    setData(address);
    console.log(address);
  }, [address]);
  const CheckData = data === null || value === null;

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

      <View style={{}}>
        <Pressable
          style={{
            justifyContent: 'center',

            paddingHorizontal: 20,
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
      {product && (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.productContainer}>
                <View style={{borderWidth: 1}}></View>

                <Image
                  source={{
                    uri: `${API_BASE_URL}uploads/${product.thumb[0]}`,
                  }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.productOptions}>
                    <Text style={styles.productOption}>{product.color}</Text>
                    <Text style={styles.separator}>|</Text>
                    <Text style={styles.productOption}>{product.size}</Text>
                  </View>
                  <View style={styles.priceQuantityContainer}>
                    <Text style={styles.productPrice}>
                      {formatPrice(product.price)}
                    </Text>
                    <Text style={styles.productQuantity}>
                      x {product.quantity}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.voucherContainer}>
                <Text style={styles.voucherText}>Voucher của shop</Text>
                <View style={styles.voucherInputContainer}>
                  <Text>Chọn hoặc nhập mã</Text>
                  <MaterialIcons name="navigate-next" size={30} color="black" />
                </View>
              </View>
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>
                  Tổng tiền ({product ? product.quantity : 0} sản phẩm) :
                </Text>
                <Text style={styles.totalPriceAmount}>
                  {product
                    ? formatPrice(product.price * product.quantity)
                    : '0 VND'}
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                padding: 10,
                marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', fontSize: 15}}>
                  Voucher khuyến mãi
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>Chọn hoặc nhập mã</Text>
                  <MaterialIcons name="navigate-next" size={30} color="black" />
                </View>
              </View>
            </Pressable>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                padding: 10,
                marginHorizontal: 10,
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
                placeholder="Phương thức"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
                itemTextStyle={{fontSize: 14}}
                selectedTextStyle={{fontSize: 14}}
              />
            </View>

            <View style={{padding: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                Chi tiết thanh toán
              </Text>
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.chitietThanhtoan}>Tổng tiền hàng:</Text>
                  <Text style={styles.chitietThanhtoan}>
                    {product
                      ? formatPrice(product.price * product.quantity)
                      : '0 VND'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text style={styles.chitietThanhtoan}>Tiền khuyến mãi:</Text>
                  <Text style={styles.chitietThanhtoan}>
                    {formatPrice(100000)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.chitietThanhtoan}>Tổng tiền hàng:</Text>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {product
                      ? formatPrice(product.price * product.quantity - 100000)
                      : '0 VND'}
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
            <View style={{marginLeft: 140, paddingHorizontal: 20}}>
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
                Tổng thanh toán:
              </Text>
              <Text
                style={{
                  color: '#FC6D26',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {product
                  ? formatPrice(product.price * product.quantity - 100000)
                  : '0 VND'}
              </Text>
            </View>

            <Pressable
              style={{
                height: 60,
                justifyContent: 'center',
                backgroundColor: CheckData ? 'gray' : 'black', // Sử dụng điều kiện để xác định màu sắc của nút
                flex: 1,
              }}
              disabled={CheckData} // Sử dụng giá trị của CheckData để disable nút
              onPress={() => {
                !CheckData && console.log('hihi'); // Log khi nút được nhấn (nếu không bị disable)
              }}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                Đặt hàng
              </Text>
            </Pressable>
          </View>
        </View>
      )}
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
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  content: {
    padding: 15,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginHorizontal: 5,
    borderRadius: 5,
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

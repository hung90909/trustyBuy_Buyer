import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ADD_CART_API, API_BASE_URL } from '../../config/urls';
import { apiDelete, apiGet, apiPost, getItem } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [listCart, setListCart] = useState([]);
  const nav = useNavigation();

  const getCart = async () => {
    try {
      const res = await apiGet(ADD_CART_API);
      setListCart(res.message.cart.cart_products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const formatPrice = priceSP => {
    if (typeof priceSP === 'number') {
      return `₫${priceSP.toLocaleString('vi-VN')}`;
    } else {
      return 'Giá không hợp lệ';
    }
  };
  const [isSelected, setSelection] = useState(false);
  const [cartid, setCartid] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUpdatePrice, setUpdatePrice] = useState(false);
  const [userID, setUserID] = useState('');

  const handleCheckboxChange = item => {
    console.log('new cart: ' + item);
    setUpdatePrice(!isUpdatePrice);
    const ids = selectedItems.map(item => item.itemId);
    if (ids.includes(item.itemId)) {
      // Nếu sản phẩm đã được chọn, loại bỏ khỏi danh sách
      setSelectedItems(selectedItems.filter(i => i.itemId !== item.itemId));
    } else {
      // Nếu sản phẩm chưa được chọn, thêm vào danh sách
      setSelectedItems([...selectedItems, item]);
    }
  };

  const onDeleteItemCart = async productId => {
    try {
      const res = await apiPost(ADD_CART_API + '/delete', {
        productId,
      });

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTotalPrice(
      selectedItems.reduce(
        (total, item) => item.price * item.quantity + total,
        0,
      ),
    );
  }, [isUpdatePrice]);

  const handleDecreaseQuantity = itemId => {
    console.log(itemId);
    setUpdatePrice(!isUpdatePrice);
    setSelectedItems(item =>
      item.map(product =>
        product.itemId === itemId
          ? {...product, quantity: product.quantity - 1}
          : product,
      ),
    );
    setListCart(item =>
      item.map(product =>
        product.itemId === itemId
          ? {...product, quantity: product.quantity - 1}
          : product,
      ),
    );
  };
  const handleIncreaseQuantity = itemId => {
    setUpdatePrice(!isUpdatePrice);
    setSelectedItems(item =>
      item.map(product =>
        product.itemId === itemId
          ? {...product, quantity: product.quantity + 1}
          : product,
      ),
    );
    setListCart(item =>
      item.map(product =>
        product.itemId === itemId
          ? {...product, quantity: product.quantity + 1}
          : product,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => {
              nav.goBack();
            }}>
            <Ionicons name="chevron-back-outline" size={30} />
          </TouchableOpacity>
          <View style={{marginLeft: 85}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Giỏ hàng
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={listCart}
        keyExtractor={item => item.itemId}
        renderItem={({item, index}) => {
          return (
            <View style={styles.product}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 25,
                  }}
                  source={{
                    uri: `${API_BASE_URL}` + item.avatar_shop,
                  }}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  {item.name_shop}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                }}>
                <View style={{justifyContent: 'center'}}>
                  <CheckBox
                    checkedColor="black"
                    value={selectedItems.includes(item)}
                    onValueChange={() => handleCheckboxChange(item)}
                    checked={
                      selectedItems.filter(
                        selectedItem => selectedItem.itemId === item.itemId,
                      ).length > 0
                    }
                    onPress={() => handleCheckboxChange(item)}
                  />
                </View>

                <Image
                  resizeMode="contain"
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 5,
                  }}
                  source={{
                    uri: `${API_BASE_URL}uploads/` + item.product_thumb,
                  }}
                />
                <View style={{marginStart: 15, width: 100}}>
                  <Text numberOfLines={2}>{item.name}</Text>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text>{item.color} | </Text>
                    <Text>{item.size}</Text>
                  </View>
                  <Text style={{marginTop: 5, color: 'red'}}>
                    {formatPrice(item.price)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: item.quantity > 9 ? 90 : 80,
                      height: 25,
                      borderRadius: 6,
                      borderWidth: 1,
                      marginTop: 5,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (item.quantity > 1) {
                          handleDecreaseQuantity(item.itemId);
                        }
                      }}
                      style={{borderRightWidth: 1, paddingHorizontal: 5}}>
                      <Ionicons name="remove-outline" color="black" size={15} />
                    </TouchableOpacity>
                    <Text style={{marginHorizontal: 8}}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleIncreaseQuantity(item.itemId);
                      }}
                      style={{borderLeftWidth: 1, paddingHorizontal: 5}}>
                      <Ionicons name="add-outline" color="black" size={15} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Thông báo',
                      'Bạn có chắc chẵn muốn xóa không ? ',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Ok',
                          onPress: () => {
                            onDeleteItemCart(item.productId);
                          },
                        },
                      ],
                    );
                  }}
                  style={{marginTop: 20}}>
                  <Ionicons name="close-circle-outline" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          height: 60,
          backgroundColor: 'white',
          borderTopWidth: 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckBox
            checkedColor="black"
            onValueChange={() => setSelection(!isSelected)}
            checked={isSelected}
            onPress={() => {
              setSelection(!isSelected);
              if (isSelected) {
                setUpdatePrice(!isSelected);
                setSelectedItems([]);
              } else {
                setUpdatePrice(!isSelected);
                setSelectedItems(listCart);
              }
            }}
          />
          <Text style={{color: 'black', fontSize: 13, marginLeft: -15}}>
            Tất cả
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Text style={{fontSize: 13, color: 'black'}}>Tổng thanh toán</Text>
          <Text
            style={{
              marginLeft: 5,
              color: 'red',
              fontSize: 13,
            }}>
            {formatPrice(totalPrice)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (selectedItems.length > 0) {
              nav.navigate('Checkout', {orderDetails: selectedItems});
            } else {
              ToastAndroid.show('Vui lòng chọn sản phẩm', ToastAndroid.LONG);
            }
          }}
          style={{
            flex: 1,
            height: 60,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Mua hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  product: {
    minHeight: 150,
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    height: '10%',
    paddingHorizontal: 20,
  },
  inputSearch: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    paddingStart: 40,
    borderColor: 'gray',
  },
});

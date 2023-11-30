import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const CartScreen = () => {
  const [listCart, setListCart] = useState([]);
  const nav = useNavigation();

  const getCart = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDkwMDIzNCwiZXhwIjoxNzAxNzY0MjM0fQ.F1lzM2nO75bSYlVpUIqcNw1Yg1KqM8coj0lkPcOEMLk'; // Thay thế bằng mã token thực tế của bạn

    try {
      const response = await fetch(
        'https://10a8-116-96-44-199.ngrok-free.app/v1/api/cartv2',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-xclient-id': '654c8a081f10540692bdc998',
            authorization: token, // Sửa lỗi chính tả, sử dụng "Authorization" thay vì "ahthorization"
          },
        },
      );

      if (!response.ok) {
        throw new Error('Lỗi khi gọi API');
      }

      const data = await response.json();
      const productList = data.message;
      console.log(productList.cart.cart_products);
      setListCart(productList.cart.cart_products);
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
  const [quantity, setQuantity] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUpdatePrice, setUpdatePrice] = useState(false);

  const handleCheckboxChange = item => {
    console.log('new cart: ' + item);
    setUpdatePrice(!isUpdatePrice);
    const ids = selectedItems.map(item => item.productId);
    if (ids.includes(item.productId)) {
      // Nếu sản phẩm đã được chọn, loại bỏ khỏi danh sách
      setSelectedItems(
        selectedItems.filter(i => i.productId !== item.productId),
      );
    } else {
      // Nếu sản phẩm chưa được chọn, thêm vào danh sách
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    setTotalPrice(
      selectedItems.reduce(
        (total, item) => item.product_price * item.product_quantity + total,
        0,
      ),
    );
  }, [isUpdatePrice]);

  const handleDecreaseQuantity = productID => {
    setUpdatePrice(!isUpdatePrice);
    setListCart(item =>
      item.map(product =>
        product.product_id === productID
          ? {...product, product_quantity: product.product_quantity - 1}
          : product,
      ),
    );
  };
  const handleIncreaseQuantity = productID => {
    setUpdatePrice(!isUpdatePrice);
    setListCart(item =>
      item.map(product =>
        product.product_id === productID
          ? {...product, product_quantity: product.product_quantity + 1}
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

        <TextInput style={styles.inputSearch} placeholder="Search" />
        <View
          style={{
            position: 'absolute',
            left: 30,
            top: 63,
          }}>
          <Ionicons name="search-outline" size={26} color="#878787" />
        </View>
      </View>
      <View style={styles.listProduct}>
        {listCart.length > 0 ? (
          <FlatList
            data={listCart}
            keyExtractor={item => item.product_id}
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
                        uri:
                          'https://10a8-116-96-44-199.ngrok-free.app/' +
                          item.avatar_shop,
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
                            selectedItem =>
                              selectedItem.productId === item.productId,
                          ).length > 0
                        }
                        onPress={() => handleCheckboxChange(item)}
                      />
                    </View>

                    <Image
                      resizeMode="stretch"
                      style={{
                        width: 100,
                        height: 90,
                      }}
                      source={{
                        uri:
                          'https://10a8-116-96-44-199.ngrok-free.app/uploads/' +
                          item.product_thumb,
                      }}
                    />
                    <View style={{marginStart: 7, width: 140}}>
                      <Text numberOfLines={2}>{item.product_name}</Text>
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
                            if (item.product_quantity > 1) {
                              handleDecreaseQuantity(item.product_id);
                            }
                          }}
                          style={{borderRightWidth: 1, paddingHorizontal: 5}}>
                          <Ionicons
                            name="remove-outline"
                            color="black"
                            size={15}
                          />
                        </TouchableOpacity>
                        <Text style={{marginHorizontal: 8}}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleIncreaseQuantity(item.productId);
                          }}
                          style={{borderLeftWidth: 1, paddingHorizontal: 5}}>
                          <Ionicons
                            name="add-outline"
                            color="black"
                            size={15}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text>Chua co du lieu</Text>
        )}
      </View>
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
    height: '20%',
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
  listProduct: {
    paddingHorizontal: 20,
    height: '73%',
  },
});

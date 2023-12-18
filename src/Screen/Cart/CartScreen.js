import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {ADD_CART_API, API_BASE_URL} from '../../config/urls';
import {apiDelete, apiGet, apiPost, getItem} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Swipeable} from 'react-native-gesture-handler';

const CartScreen = () => {
  const [listCart, setListCart] = useState([]);
  const nav = useNavigation();

  const [loading, setLoading] = useState(true);

  //...

  const getCart = async () => {
    try {
      // Khi bắt đầu load dữ liệu, đặt trạng thái loading là true
      setLoading(true);

      const res = await apiGet(ADD_CART_API);
      setListCart(res.message.cart.cart_products);
      
    } catch (error) {
      console.log(error);
    } finally {
      // Khi load xong dữ liệu, đặt trạng thái loading là false
      setLoading(false);
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
    // console.log('new cart: ' + item);
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

  const onDeleteItemCart = async (productId, size, color) => {

    try {
        await apiPost(ADD_CART_API + '/delete', {
          productId, size , color
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
    // console.log(itemId);
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

  const renderSanpham = ({item}) => {
    return (
      <View style={styles.product}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              textTransform: 'uppercase',
              fontSize: 15,
            }}>
            {item.name_shop}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // borderWidth: 1,
            paddingVertical: 20,
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
              width: 100,
              height: 100,
            }}
            source={{
              uri: `${API_BASE_URL}uploads/` + item.product_thumb,
            }}
          />
          <View style={{marginStart: 10, flex: 1}}>
            <Text style={{fontSize: 16, color: 'black'}} numberOfLines={2}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
              }}>
              <Text style={{textTransform: 'uppercase'}}>{item.color}</Text>
              <AntDesign
                name="minus"
                size={8}
                color={'black'}
                style={{marginHorizontal: 5}}
              />
              <Text style={{textTransform: 'uppercase'}}>{item.size}</Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#FC6D26',
                fontWeight: 'bold',
              }}>
              {formatPrice(item.price)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                height: 25,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (item.quantity > 1) {
                    handleDecreaseQuantity(item.itemId);
                  }
                }}
                style={{
                  padding: 5,
                  marginRight: 8,
                }}>
                <Ionicons name="remove-outline" color="black" size={18} />
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleIncreaseQuantity(item.itemId);
                }}
                style={{
                  padding: 5,
                  marginLeft: 8,
                }}>
                <Ionicons name="add-outline" color="black" size={18} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Thông báo', 'Bạn có chắc chẵn muốn xóa không ? ', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Ok',
                  onPress: () => {
                    onDeleteItemCart(item.productId, item.size, item.color);
                  },
                },
              ]);
            }}
            style={{
              marginTop: 20,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <AntDesign name="delete" size={24} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <Ionicons name="chevron-back-outline" size={26} color={'black'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            color: 'black',
            textAlign: 'center',
          }}>
          Giỏ hàng
        </Text>
        <Pressable onPress={() => nav.navigate('ChatScreen')}>
          <Ionicons name="chatbubbles-outline" size={26} color={'black'} />
        </Pressable>
      </View>
      {loading ? ( // Kiểm tra trạng thái loading để hiển thị "loading"
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : listCart.length > 0 ? (
        <FlatList
          data={listCart}
          keyExtractor={item => item.itemId}
          renderItem={renderSanpham}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              width: 100,
              height: 100,
              tintColor: 'gray',
            }}
            source={require('../../Resource/Image/shopping.png')}
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: 5,
            }}>
            Giỏ hàng không có sản phẩm
          </Text>
        </View>
      )}
      <View
        style={{
          height: 60,
          backgroundColor: 'white',
          borderTopWidth: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        </View>
        <View style={{marginHorizontal: 10}}>
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
              const formattedData = selectedItems.map(item => ({
                product: {
                  avatarShop: `${API_BASE_URL}${item.avatar_shop}`,
                  color: item.color,
                  name: item.name,
                  nameShop: item.name_shop,
                  price: item.price,
                  productId: item.productId,
                  quantity: item.quantity,
                  shopId: item.shopId,
                  size: item.size,
                  thumb: item.product_thumb,
                },
              }));

              nav.navigate('Checkout', {orderDetails: formattedData});
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
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

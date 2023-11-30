import React, {useCallback, useEffect, useState, useRef} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {formatPrice, formatSoldSP} from './Format';
import Listproducts from './Listproducts';
import {ADD_CART_API, API_BASE_URL, PRODUCT_API} from '../API/getAPI';
const DetailProducts = ({route, navigation}) => {
  const {productId} = route.params;
  const bottomSheetModalRef = useRef(null);
  const [productDetail, setProductDetail] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [bottomSheetAction, setBottomSheetAction] = useState('addToCart');

  const handleIncreaseQuantity = () => {
    if (selectedColor && selectedSize) {
      const totalQuantity = getTotalQuantityForColorAndSize(
        selectedColor,
        selectedSize,
      );
      if (quantity < 100 && quantity < totalQuantity) {
        setQuantity(quantity + 1);
      } else {
        Alert.alert('Thông báo', 'Số lượng sản phẩm đặt đã đạt giới hạn');
      }
    } else {
      Alert.alert(
        'Thông báo',
        'Vui lòng chọn màu sắc và kích thước trước khi thay đổi số lượng',
      );
    }
  };
  const resetQuantity = () => {
    if (selectedColor && selectedSize) {
      const totalQuantity = getTotalQuantityForColorAndSize(
        selectedColor,
        selectedSize,
      );
      setQuantity(Math.min(totalQuantity, 1));
    } else {
      setQuantity(1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getTotalQuantityForColorAndSize = (color, size) => {
    // Calculate and return the total quantity based on the selected color and size
    const colorOption = productDetail.product_attributes.find(
      item => item.color === color,
    );
    if (colorOption) {
      const sizeOption = colorOption.options.find(
        sizeItem => sizeItem.size === size,
      );
      if (sizeOption) {
        return sizeOption.options_quantity;
      }
    }
    return 0; // Return 0 if color or size not found
  };

  const handleBuyNow = async () => {
    try {
      handleIncreaseQuantity();
      if (selectedColor && selectedSize && selectedQuantity !== null) {
        const totalQuantity = getTotalQuantityForColorAndSize(
          selectedColor,
          selectedSize,
        );

        const headers = {
          'x-xclient-id': '654c8a081f10540692bdc998',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDkwMDIzNCwiZXhwIjoxNzAxNzY0MjM0fQ.F1lzM2nO75bSYlVpUIqcNw1Yg1KqM8coj0lkPcOEMLk',
        };

        const orderItem = {
          product: {
            productId: productId,
            shopId: productDetail.shop_id,
            quantity: quantity,
            name: productDetail.product_name,
            price: productDetail.product_price,
            color: selectedColor,
            size: selectedSize,
            thumb: productDetail.product_thumb,
          },
        };
        console.log(quantity);
        navigation.navigate('Checkout', {orderDetails: orderItem});

        // You can customize this part based on your business logic
        // Here, it just shows an alert with the total quantity
        const updatedTotalQuantity = getTotalQuantityForColorAndSize(
          selectedColor,
          selectedSize,
        );

        // Alert.alert(
        //   'Mua ngay thành công',
        //   `Tổng số lượng sản phẩm: ${updatedTotalQuantity}`,
        // );

        // Reset selected options after buying
        navigation.navigate('Checkout', {orderDetails: orderItem});
        setSelectedColor(null);
        setSelectedSize(null);
        setSelectedQuantity(null);
      } else {
        if (!selectedColor) {
          Alert.alert('Vui lòng chọn màu sắc của sản phẩm');
        } else if (!selectedSize) {
          Alert.alert('Vui lòng chọn kích thước của sản phẩm');
        } else {
          Alert.alert('Sản phẩm này hiện không có sẵn');
        }
      }
    } catch (error) {
      console.error('Error buying:', error.response.data);
    }
  };
  const handleAddToCart = async quantity => {
    try {
      if (selectedColor && selectedSize && quantity !== null) {
        const totalQuantity = getTotalQuantityForColorAndSize(
          selectedColor,
          selectedSize,
        );

        const headers = {
          'x-xclient-id': '654c8a081f10540692bdc998',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDkwMDIzNCwiZXhwIjoxNzAxNzY0MjM0fQ.F1lzM2nO75bSYlVpUIqcNw1Yg1KqM8coj0lkPcOEMLk',
        };

        const cartItem = {
          userId: '654c8a081f10540692bdc998',
          product: {
            productId: productId,
            shopId: productDetail.shop_id,
            quantity: quantity,
            name: productDetail.product_name,
            price: productDetail.product_price,
            color: selectedColor,
            size: selectedSize,
            imageShop: productDetail.shop_avatar,
            nameShop: productDetail.shop_name,
          },
        };

        const response = await axios.post(
          `${API_BASE_URL}v1/api/cartv2`,
          cartItem,
          {
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          },
        );

        console.log('Added to cart:', response.data.message);

        // Reset selected options after adding to the cart
        setSelectedColor(null);
        setSelectedSize(null);
        setSelectedQuantity(null);

        const updatedTotalQuantity = getTotalQuantityForColorAndSize(
          selectedColor,
          selectedSize,
        );

        // Alert.alert(
        //   'Thêm vào giỏ hàng thành công',
        //   `Tổng số lượng sản phẩm: ${updatedTotalQuantity}`,
        // );
      } else {
        if (!selectedColor) {
          Alert.alert('Vui lòng chọn màu sắc của sản phẩm');
        } else if (!selectedSize) {
          Alert.alert('Vui lòng chọn kích thước của sản phẩm');
        } else {
          Alert.alert('Sản phẩm này hiện không có sẵn');
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error.response.data);
    }
  };

  const handleSizePress = size => {
    setSelectedSize(size);
    resetQuantity(); // Reset quantity when size is selected
  };
  const snapPoints = ['70%'];
  const handlePresentModal = action => {
    setBottomSheetAction(action);
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsBottomSheetVisible(true);
    }, 100);
  };

  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        // Tạo đối tượng headers để chứa các thông tin header
        const headers = {
          'x-xclient-id': '654c8a081f10540692bdc998', // Thay 'your-client-id' bằng giá trị thực tế
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDkwMDIzNCwiZXhwIjoxNzAxNzY0MjM0fQ.F1lzM2nO75bSYlVpUIqcNw1Yg1KqM8coj0lkPcOEMLk', // Thay 'your-access-token' bằng giá trị thực tế
        };
        // Thực hiện GET request đến API endpoint với headers
        const response = await axios.get(
          `${PRODUCT_API}/getProduct/${productId}`,
          {
            headers,
          },
        );
        setProductDetail(response.data.message);
      } catch (error) {
        console.error(error.response.data);
      } finally {
        resetQuantity(); // Reset quantity when product details are loaded
      }
    };
    getDetailProduct();
  }, [selectedColor, selectedSize]);

  const renderImage = useCallback(({item}) => {
    return (
      <Image
        style={{height: 400, width: 420}}
        source={{
          uri: `${API_BASE_URL}uploads/${item}`,
        }}
        resizeMode="cover"
      />
    );
  });
  const handleColorPress = (color, options) => {
    setSelectedColor(color);
    setSelectedSize(null); // Reset selectedSize when changing color
    setSelectedQuantity(
      options.reduce((total, item) => total + item.options_quantity, 0),
    );
    resetQuantity();
  };

  const getTotalQuantity = () => {
    // Calculate the total quantity based on all available colors
    return productDetail.product_attributes.reduce(
      (total, item) =>
        total +
        item.options.reduce(
          (sizeTotal, sizeItem) => sizeTotal + sizeItem.options_quantity,
          0,
        ),
      0,
    );
  };
  const isAddToCartDisabled =
    selectedColor === null ||
    selectedSize === null ||
    selectedQuantity === null;

  const ColorOption = ({item}) => (
    <Pressable
      style={[
        {padding: 10, margin: 10, borderRadius: 5},
        selectedColor === item.color
          ? {backgroundColor: 'white', borderWidth: 1}
          : {},
      ]}
      onPress={() => handleColorPress(item.color, item.options)}>
      <Text style={{color: 'black', fontWeight: 'bold', padding: 5}}>
        {item.color}
      </Text>
    </Pressable>
  );

  const SizeOption = ({sizeItem}) => (
    <Pressable
      style={[
        {padding: 10, margin: 10, borderRadius: 5},
        selectedSize === sizeItem.size
          ? {backgroundColor: 'white', borderWidth: 1, color: 'black'}
          : {},
      ]}
      onPress={() => handleSizePress(sizeItem.size)}>
      <Text style={{color: 'black', fontWeight: 'bold', padding: 5}}>
        {sizeItem.size}
      </Text>
    </Pressable>
  );
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <ScrollView>
            <View>
              <FlatList
                data={productDetail?.product_thumb || []}
                renderItem={renderImage}
                horizontal
              />
              <View style={styles.container}>
                <Text style={styles.nameProduct}>
                  {productDetail?.product_name}
                </Text>
                <Text style={styles.priceProduct}>
                  {formatPrice(productDetail?.product_price)}
                </Text>
                <View style={styles.ratingSoldPr}>
                  <View style={styles.ratingStar}>
                    <AntDesign name="star" size={18} color={'#FFCC00'} />
                    <Text style={styles.titleSold}>
                      {productDetail?.product_ratingAverage}
                    </Text>
                  </View>

                  <Text style={styles.titleSold}>
                    Đã bán {formatSoldSP(productDetail?.product_sold)}
                  </Text>
                </View>
                <View style={styles.shopProduct}>
                  <Image
                    style={styles.imgShop}
                    source={{
                      uri: `${API_BASE_URL}${productDetail?.shop_avatar}`,
                    }}
                  />
                  <View style={styles.nameShowShop}>
                    <Text style={styles.nameShop}>
                      {productDetail?.shop_name}
                    </Text>
                    <Pressable
                      style={styles.butonDetailShop}
                      onPress={() => navigation.navigate('ShopInformation')}>
                      <Text style={styles.titleButon}>Xem cửa hàng</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.containerProductdetail}>
                  <Text style={styles.titleDetail}>Chi tiết sản phẩm</Text>
                  <Text style={styles.titleContent}>
                    {productDetail?.product_description}
                  </Text>
                </View>
              </View>
              <View style={styles.suggestionsProduct}>
                <Text style={styles.titelSuggestions}>Gợi ý các sản phẩm</Text>
                <Listproducts />
              </View>
              <TouchableOpacity style={styles.btnShowShop}>
                <Text style={{color: 'white', fontSize: 12}}>Xem cửa hàng</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.butonCartBuy}>
            <Pressable style={styles.btnChat}>
              <Ionicons name="chatbubbles-outline" size={30} color={'black'} />
            </Pressable>
            <View style={styles.line}></View>
            <Pressable
              style={styles.btnCart}
              onPress={() => handlePresentModal('addToCart')}>
              <MaterialCommunityIcons
                name="cart-plus"
                size={28}
                color={'black'}
              />
            </Pressable>

            <Pressable
              style={styles.btnBuy}
              onPress={() => handlePresentModal('buyNow')}>
              <Text style={styles.titleBuy}>Mua ngay</Text>
            </Pressable>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{borderRadius: 10}}
            onDismiss={() => setIsBottomSheetVisible(false)}>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {productDetail?.product_thumb &&
              productDetail.product_thumb.length > 0 ? (
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{height: 150, width: 150, marginRight: 10}}
                      source={{
                        uri: `${API_BASE_URL}uploads/${productDetail.product_thumb[0]}`,
                      }}
                      resizeMode="cover"
                    />
                    <View>
                      <Text style={styles.priceProduct}>
                        {formatPrice(productDetail?.product_price)}
                      </Text>
                      {(selectedQuantity !== undefined ||
                        selectedColor === null) && (
                        <Text>
                          Kho: {selectedQuantity || getTotalQuantity()}
                        </Text>
                      )}
                    </View>
                  </View>
                  <ScrollView>
                    {productDetail?.product_attributes &&
                    productDetail.product_attributes.length > 0 ? (
                      <>
                        <View style={{marginTop: 40}}>
                          <View>
                            <Text
                              style={{
                                marginRight: 10,
                                fontWeight: 'bold',
                                color: 'black',
                                fontSize: 18,
                              }}>
                              Màu sắc:
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            {productDetail.product_attributes.map(
                              (item, index) => (
                                <Pressable
                                  key={index}
                                  style={() => [
                                    {
                                      padding: 10,
                                      margin: 10,
                                      borderRadius: 5,
                                    },
                                    selectedColor === item.color
                                      ? {
                                          backgroundColor: 'white',
                                          borderWidth: 1,
                                        }
                                      : {},
                                  ]}
                                  onPress={() =>
                                    handleColorPress(item.color, item.options)
                                  }>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontWeight: 'bold',
                                      padding: 5,
                                    }}>
                                    {item.color}
                                  </Text>
                                </Pressable>
                              ),
                            )}
                          </View>
                        </View>

                        {/* Display sizes and total quantity based on selectedColor */}
                        {selectedColor && (
                          <View style={{marginTop: 20}}>
                            <Text
                              style={{
                                marginRight: 10,
                                fontWeight: 'bold',
                                color: 'black',
                                fontSize: 18,
                              }}>
                              Kích cỡ:
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              {productDetail.product_attributes
                                .find(item => item.color === selectedColor)
                                ?.options.map((sizeItem, sizeIndex) => (
                                  <Pressable
                                    key={sizeIndex}
                                    style={() => [
                                      {
                                        padding: 10,
                                        margin: 10,
                                        borderRadius: 5,
                                      },
                                      selectedSize === sizeItem.size
                                        ? {
                                            backgroundColor: 'white',
                                            borderWidth: 1,
                                            color: 'black',
                                          }
                                        : {},
                                    ]}
                                    onPress={() => {
                                      setSelectedSize(sizeItem.size);
                                      setSelectedQuantity(
                                        sizeItem.options_quantity,
                                      );
                                    }}>
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        padding: 5,
                                      }}>
                                      {sizeItem.size}
                                    </Text>
                                  </Pressable>
                                ))}
                            </View>
                          </View>
                        )}
                      </>
                    ) : (
                      <Text>No product attributes available</Text>
                    )}
                  </ScrollView>
                </View>
              ) : (
                <Text>No image available</Text>
              )}
            </View>
            <View
              style={{
                height: 60,
                backgroundColor: 'white',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: isAddToCartDisabled ? '#CCCCCC' : 'black'}}>
                Số lượng
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={isAddToCartDisabled ? null : handleDecreaseQuantity}
                  style={{
                    borderWidth: 1,
                    padding: 2,
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: isAddToCartDisabled ? '#CCCCCC' : 'gray',
                    borderTopLeftRadius: 2,
                    borderBottomLeftRadius: 2,
                  }}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={isAddToCartDisabled ? '#CCCCCC' : 'black'}
                  />
                </Pressable>
                <TextInput
                  style={{
                    fontSize: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 5,
                    color: isAddToCartDisabled ? '#CCCCCC' : '#FC6D26',
                    height: 30,
                    borderColor: isAddToCartDisabled ? '#CCCCCC' : 'gray',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                  }}
                  keyboardType="numeric"
                  value={quantity.toString()}
                  onChangeText={text => {
                    const numericValue = parseInt(text, 10);
                    if (
                      !isNaN(numericValue) &&
                      numericValue >= 1 &&
                      numericValue <= 100 &&
                      numericValue <=
                        getTotalQuantityForColorAndSize(
                          selectedColor,
                          selectedSize,
                        )
                    ) {
                      setQuantity(numericValue);
                    }
                  }}
                />

                <Pressable
                  onPress={isAddToCartDisabled ? null : handleIncreaseQuantity}
                  style={{
                    borderWidth: 1,
                    padding: 2,
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: isAddToCartDisabled ? '#CCCCCC' : 'gray',
                    borderTopRightRadius: 2,
                    borderBottomRightRadius: 2,
                  }}>
                  <AntDesign
                    name="plus"
                    size={18}
                    color={isAddToCartDisabled ? '#CCCCCC' : 'black'}
                  />
                </Pressable>
              </View>
            </View>

            {bottomSheetAction === 'addToCart' ? (
              <Pressable
                style={[
                  styles.btnAddCart,
                  {backgroundColor: isAddToCartDisabled ? '#EEEEEE' : 'black'},
                ]}
                onPress={
                  isAddToCartDisabled ? null : () => handleAddToCart(quantity)
                }>
                <Text
                  style={[
                    styles.titleBtnAddCart,
                    {color: isAddToCartDisabled ? '#CCCCCC' : 'white'},
                  ]}>
                  Thêm vào giỏ hàng
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={[
                  styles.btnAddCart,
                  {backgroundColor: isAddToCartDisabled ? '#EEEEEE' : 'black'},
                ]}
                onPress={isAddToCartDisabled ? null : handleBuyNow}>
                <Text
                  style={[
                    styles.titleBtnAddCart,
                    {color: isAddToCartDisabled ? '#CCCCCC' : 'white'},
                  ]}>
                  Mua ngay
                </Text>
              </Pressable>
            )}
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  nameProduct: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  ratingSoldPr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceProduct: {
    fontSize: 18,
    marginVertical: 10,
    color: '#FC6D26',
    fontWeight: 'bold',
  },
  titleSold: {
    color: 'black',
  },
  ratingStar: {
    flexDirection: 'row',
    marginRight: 20,
  },
  shopProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  nameShop: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  nameShowShop: {marginLeft: 20},
  butonDetailShop: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  titleButon: {
    color: 'white',
  },
  suggestionsProduct: {
    marginTop: 20,
  },
  butonCartBuy: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnBuy: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btnCart: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBuy: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  titleCart: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  titelSuggestions: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerProductdetail: {},
  titleDetail: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  titleContent: {
    color: 'black',
    marginHorizontal: 5,
  },
  btnChat: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCart: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: 30,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  btnAddCart: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleBtnAddCart: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgShop: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default DetailProducts;

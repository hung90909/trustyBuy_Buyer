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
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {formatPrice, formatSoldSP} from '../Format';
import Listproducts from './Listproducts';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {chatApi} from '../../redux/actions/chat';
import Comment from '../Rating/Comment';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const DetailProducts = ({route, navigation}) => {
  const {productId} = route.params;
  const bottomSheetModalRef = useRef(null);
  const [productDetail, setProductDetail] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [bottomSheetAction, setBottomSheetAction] = useState('addToCart');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  console.log(productDetail?.shop_id);
  const chatData = useSelector(state => state?.chat?.chatData);

  const handleIncreaseQuantity = () => {
    if (selectedColor && selectedSize) {
      const totalQuantity = getTotalQuantityForColorAndSize(
        selectedColor,
        selectedSize,
      );
      if (quantity < 50 && quantity < totalQuantity) {
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
    return 0;
  };

  const handleBuyNow = async () => {
    try {
      if (selectedColor && selectedSize && selectedQuantity !== null) {
        const totalQuantity = getTotalQuantityForColorAndSize(
          selectedColor,
          selectedSize,
        );
        const data = await AsyncStorage.getItem('token');
        const userID = JSON.parse(data).userId;
        const orderItem = [
          {
            userId: userID,
            product: {
              productId: productId,
              shopId: productDetail.shop_id,
              quantity: quantity,
              name: productDetail.product_name,
              price: productDetail.product_price,
              color: selectedColor,
              size: selectedSize,
              thumb: productDetail.product_thumb[0],
              avatarShop: productDetail.shop_avatar,
              nameShop: productDetail.shop_name,
            },
          },
        ];
        const updatedTotalQuantity = getTotalQuantityForColorAndSize(
          selectedColor,
          selectedSize,
        );
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
        const data = await AsyncStorage.getItem('token');
        const userID = JSON.parse(data).userId;
        const cartItem = {
          userId: userID,
          product: {
            productId: productId,
            shopId: productDetail.shop_id,
            quantity: quantity,
            name: productDetail.product_name,
            price: productDetail.product_price,
            color: selectedColor,
            size: selectedSize,
          },
        };

        const response = await apiPost(
          `${API_BASE_URL}v1/api/cartv2`,
          cartItem,
        );

        setSelectedColor(null);
        setSelectedSize(null);
        setSelectedQuantity(null);

        const updatedTotalQuantity = getTotalQuantityForColorAndSize(
          selectedColor,
          selectedSize,
        );

        navigation.navigate('Cart');
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
      console.error('Error adding to cart:', error);
    }
  };

  const handleSizePress = size => {
    setSelectedSize(size);
    resetQuantity(); // Reset quantity when size is selected
  };
  const snapPoints = ['80%'];
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
        const response = await apiGet(`${PRODUCT_API}/getProduct/${productId}`);
        setProductDetail(response?.message);
        setSelectedProductId(productId);
      } catch (error) {
        console.error(error.response.data);
      } finally {
        resetQuantity(); // Reset quantity when product details are loaded
      }
    };

    const getAllProduct = async () => {
      try {
        const response = await apiGet(`${PRODUCT_API}/getAllProductByUser`);
        setRelatedProducts(response.message.allProduct);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    getDetailProduct();
    getAllProduct();
  }, [selectedColor, selectedSize, productId]);
  const renderImage = useCallback(({item}) => {
    return (
      <Image
        style={{height: 400, width: width}}
        source={{
          uri: `${API_BASE_URL}uploads/${item}`,
        }}
        resizeMode="contain"
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
  const handleShopPress = shopId => {
    navigation.navigate('ShopInformation', {shopId});
    // console.log(shopId);
    setSelectedProductId(productId);
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

  // const ColorOption = ({item}) => (
  //   <Pressable
  //     style={[
  //       {padding: 10, margin: 10, borderRadius: 5},
  //       selectedColor === item.color
  //         ? {backgroundColor: 'white', borderWidth: 1}
  //         : {},
  //     ]}
  //     onPress={() => handleColorPress(item.color, item.options)}>
  //     <Text style={{color: 'black', fontWeight: 'bold', padding: 5}}>
  //       {item.color}
  //     </Text>
  //   </Pressable>
  // );

  // const SizeOption = ({sizeItem}) => (
  //   <Pressable
  //     style={[
  //       {padding: 10, margin: 10, borderRadius: 5},
  //       selectedSize === sizeItem.size
  //         ? {backgroundColor: 'white', borderWidth: 1, color: 'black'}
  //         : {},
  //     ]}
  //     onPress={() => handleSizePress(sizeItem.size)}>
  //     <Text style={{color: 'black', fontWeight: 'bold', padding: 5}}>
  //       {sizeItem.size}
  //     </Text>
  //   </Pressable>
  // );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View>
              <View style={{flex: 1}}>
                <FlatList
                  data={productDetail?.product_thumb || []}
                  renderItem={renderImage}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={3}
                  getItemLayout={(data, index) => ({
                    length: 420, // Độ dài của mỗi mục
                    offset: 420 * index,
                    index,
                  })}
                  style={{backgroundColor: 'white', position: 'relative'}}
                />
                <Ionicons
                  name="arrow-back"
                  size={26}
                  color="black"
                  onPress={() => navigation.goBack()}
                  style={{
                    position: 'absolute',
                    top: 16, // Adjust the top position as needed
                    left: 16, // Adjust the left position as needed
                    zIndex: 1, // Ensure the icon is above the FlatList
                  }}
                />
              </View>

              <View style={styles.container}>
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    paddingVertical: 20,
                  }}>
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
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={styles.imgShop}
                    source={{
                      uri: `${API_BASE_URL}${productDetail?.shop_avatar}`,
                    }}
                  />
                  <View style={styles.nameShowShop}>
                    <View style={{}}>
                      <Text style={styles.nameShop}>
                        {productDetail?.shop_name}
                      </Text>
                    </View>

                    <View>
                      <Pressable
                        onPress={() => handleShopPress(productDetail?.shop_id)}
                        style={styles.butonDetailShop}>
                        <Text style={styles.titleButon}>Xem cửa hàng</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View style={styles.containerProductdetail}>
                  <Text style={styles.titleDetail}>Mô tả sản phẩm</Text>
                  <Text style={styles.titleContent}>
                    {productDetail?.product_description}
                  </Text>
                </View>
              </View>

              {productDetail && (
                <View
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#ddd',
                  }}>
                  <Comment navigation={navigation} data={productDetail} />
                </View>
              )}

              <View style={styles.suggestionsProduct}>
                <Text style={styles.titelSuggestions}>Gợi ý các sản phẩm</Text>
                <Listproducts />
              </View>
            </View>
          </ScrollView>
          <View style={styles.butonCartBuy}>
            <Pressable
              style={styles.btnChat}
              onPress={() =>
                chatApi(productDetail?.shop_id, chatData, navigation)
              }>
              <Ionicons name="chatbubbles-outline" size={30} color={'black'} />
            </Pressable>
            <View style={styles.line} />
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
    flex: 1,
  },
  nameProduct: {
    fontSize: 20,
    color: 'black',
  },
  ratingSoldPr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceProduct: {
    fontSize: 18,
    marginVertical: 5,
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
    marginVertical: 5,
    backgroundColor: 'white',
    padding: 15,
  },
  nameShop: {
    fontSize: 18,
    color: 'black',
    textTransform: 'uppercase',
  },
  nameShowShop: {
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  butonDetailShop: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  titleButon: {
    color: 'white',
    alignSelf: 'center',
  },
  suggestionsProduct: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
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
    fontSize: 16,
    textAlign: 'center',
  },
  containerProductdetail: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
  },
  titleDetail: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  titleContent: {
    color: 'gray',
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
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});

export default DetailProducts;

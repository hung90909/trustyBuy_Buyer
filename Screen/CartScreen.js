import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const CartScreen = () => {


  const [listCart, setListCart] = useState([])
  const nav = useNavigation()

  const getCart = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM2OGYzM2VmNWJkZjE3MGM2NzgxNzciLCJlbWFpbCI6Ikh1bmdAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkakxuaGRUdjFuTDU0VXBMUGVFVTV6dTkudXl1TzRWS0sxbHNCR3k1ay9yZXBaRk41ZnFTQmUiLCJpYXQiOjE2OTg1OTA0NTIsImV4cCI6MTY5OTQ1NDQ1Mn0.qM4BH_mULdGuC9fYEnJ8kj0oSwoKHbXCgTELA36dpUM"; // Thay thế bằng mã token thực tế của bạn

    try {
      const response = await fetch("https://1f79-116-96-46-69.ngrok-free.app/v1/api/cart/getCart", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-xclient-id": "65368f33ef5bdf170c678177",
          ahthorization: token // Sửa lỗi chính tả, sử dụng "Authorization" thay vì "ahthorization"
        }
      });

      if (!response.ok) {
        throw new Error('Lỗi khi gọi API');
      }

      const data = await response.json();
      const productList = data.message;
      setListCart(productList.cart.products);

    } catch (error) {
      console.log(error);
    }
  }

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


  const dataCart = [
    {
      id: 1,
      avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      nameShop: "GShock Việt Nam Official",
      image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
      color: "trăng",
      size: "XL",
      price: 20000000,
      quantity: 3
    },
    {
      id: 2,
      avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      nameShop: "GShock Việt Nam Official",
      image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
      color: "trăng",
      size: "XL",
      price: 20000000,
      quantity: 3
    },
    {
      id: 3,
      avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      nameShop: "GShock Việt Nam Official",
      image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
      color: "trăng",
      size: "XL",
      price: 20000000,
      quantity: 3
    },
    {
      id: 4,
      avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      nameShop: "GShock Việt Nam Official",
      image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
      name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
      color: "trăng",
      size: "XL",
      price: 20000000,
      quantity: 3
    },
  ]
  const [isSelected, setSelection] = useState(false);
  const [quantity, setQuantity] = useState(0)
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [isUpdatePrice, setUpdatePrice] = useState(false)

  const handleCheckboxChange = (item) => {
    console.log("new cart: " + item)
    setUpdatePrice(!isUpdatePrice)
    const ids = selectedItems.map(item => item.product_id)
    if (ids.includes(item.product_id)) {
      // Nếu sản phẩm đã được chọn, loại bỏ khỏi danh sách
      setSelectedItems(selectedItems.filter((i) => i.product_id !== item.product_id));
    } else {
      // Nếu sản phẩm chưa được chọn, thêm vào danh sách
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    setTotalPrice(selectedItems.reduce((total, item) => (item.product_price * item.product_quantity) + total, 0))
  }, [isUpdatePrice])


  const handleDecreaseQuantity = (productID) => {
    setUpdatePrice(!isUpdatePrice)
    setListCart(item =>
      item.map(product =>
        product.product_id === productID ? { ...product, product_quantity: product.product_quantity - 1 }
          : product

      )

    )
  }
  const handleIncreaseQuantity = (productID) => {
    setUpdatePrice(!isUpdatePrice)
    setListCart(item =>
      item.map(product =>
        product.product_id === productID ? { ...product, product_quantity: product.product_quantity + 1 }
          : product
      )

    )
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
          <TouchableOpacity onPress={() =>{
            nav.goBack()
          }}>
            <Ionicons name='chevron-back-outline' size={30} />
          </TouchableOpacity>
          <View style={{marginLeft:85}}>
            <Text style={{
              fontSize: 25, fontWeight: "bold",
              alignSelf: "center"
            }}>Giỏ hàng</Text>
          </View>

        </View>


        <TextInput style={styles.inputSearch}
          placeholder='Search' />
        <View style={{
          position: "absolute",
          left: 30, top: 63
        }}>
          <Ionicons name="search-outline" size={26} color="#878787" />
        </View>

      </View>
      <View style={styles.listProduct}>
        {listCart.length > 0 ? <FlatList
          data={listCart}
          keyExtractor={item => item.product_id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.product}>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center", paddingHorizontal: 10
                }}>
                  <Image style={{
                    height: 30, width: 30, borderRadius: 25
                  }} source={{ uri: item.avatar_shop }} />
                  <Text style={{
                    marginLeft: 6, fontWeight: "bold", color: "black"
                  }}>{item.name_shop}</Text>
                </View>
                <View style={{
                  flexDirection: "row", marginTop: 15,
                }}>
                  <View style={{ justifyContent: "center" }}>
                    <CheckBox
                      checkedColor='black'
                      value={selectedItems.includes(item)}
                      onValueChange={() => handleCheckboxChange(item)}
                      checked={selectedItems.filter((selectedItem) => selectedItem.product_id === item.product_id).length > 0}
                      onPress={() => handleCheckboxChange(item)}
                    />
                  </View>

                  <Image
                    resizeMode='stretch'
                    style={{
                      width: 100, height: 90,
                    }} source={{ uri: item.product_thumb }} />
                  <View style={{ marginStart: 7, width: 140, }}>
                    <Text numberOfLines={2}>{item.product_name}</Text>
                    <View style={{ flexDirection: "row", marginTop: 5, }}>
                      <Text>{item.color} | </Text>
                      <Text>{item.size}</Text>
                    </View>
                    <Text style={{ marginTop: 5, color: "red" }}>{formatPrice(item.product_price)}</Text>
                    <View style={{
                      flexDirection: "row", width: item.quantity > 9 ? 90 : 80, height: 25, borderRadius: 6,
                      borderWidth: 1, marginTop: 5, alignItems: "center",
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (item.product_quantity > 1) {
                            handleDecreaseQuantity(item.product_id)
                          }

                        }}
                        style={{ borderRightWidth: 1, paddingHorizontal: 5 }}>
                        <Ionicons name="remove-outline" color="black" size={15} />
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 8 }}>{item.product_quantity}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleIncreaseQuantity(item.product_id)
                        }}
                        style={{ borderLeftWidth: 1, paddingHorizontal: 5 }}>
                        <Ionicons name="add-outline" color="black" size={15} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        /> : <Text>Chua co du lieu</Text>}
      </View>
      <View style={{
        height: 60, backgroundColor: "white",
        borderTopWidth: 1, alignItems: "center",
        flexDirection: "row", 
      }}>
        <View style={{ flexDirection: "row",
         justifyContent: "center", alignItems: "center" ,}}>
          <CheckBox
            checkedColor='black'
            onValueChange={() => setSelection(!isSelected)}
            checked={isSelected}
            onPress={() => {
              setSelection(!isSelected)
              if (isSelected) {
                setUpdatePrice(!isSelected)
                setSelectedItems([])
              } else {
                setUpdatePrice(!isSelected)
                setSelectedItems(listCart)
              }
            }}
          />
          <Text style={{ color: "black", fontSize: 13, marginLeft: -15 }}>Tất cả</Text>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
          <Text style={{ fontSize: 13, color: "black" }}>Tông thanh toán</Text>
          <Text style={{
            marginLeft: 5, color: "red", fontSize: 13
          }}>{formatPrice(totalPrice)}</Text>
        </View>
        <TouchableOpacity style={{
          flex: 1, height: 60,
          backgroundColor: "black", justifyContent: "center", alignItems: "center"
        }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Mua hàng</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  product: {
    minHeight: 150,
    backgroundColor: "white", marginTop: 10,
    paddingVertical: 10, borderRadius: 10
  },
  container: {
    flex: 1, marginTop: 20
  },
  header: {
    height: "20%",
    paddingHorizontal: 20
  },
  inputSearch: {
    width: "100%", height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    paddingStart: 40,
    borderColor: "gray"
  },
  listProduct: {
    paddingHorizontal: 20,
    height: "70%",
  }
});

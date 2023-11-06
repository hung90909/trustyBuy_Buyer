import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CartScreen = () => {

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
  const [cart, setCart] = useState(dataCart)
  const handleCheckboxChange = (item) => {
    const ids = selectedItems.map(item => item.id)
    if (ids.includes(item.id)) {
      // Nếu sản phẩm đã được chọn, loại bỏ khỏi danh sách
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      // Nếu sản phẩm chưa được chọn, thêm vào danh sách
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    setTotalPrice(selectedItems.reduce((total, item) => item.price + total, 0))
  }, [selectedItems])

  const formatPrice = priceSP => {
    return `₫${priceSP.toLocaleString('vi-VN')}`;
  };

  const handleDecreaseQuantity = (productID) => {
    setCart(item => 
      item.map(product => 
        product.id === productID ? { ...product, quantity: product.quantity - 1 }
          : product
      )
     
    )
  }
  const handleIncreaseQuantity = (productID) => {
    setCart(item => 
      item.map(product => 
        product.id === productID ? { ...product, quantity: product.quantity + 1 }
          : product
      )
     
    )
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={{
          fontSize: 25, fontWeight: "bold",
          alignSelf: "center"
        }}>Giỏ hàng</Text>

        <TextInput style={styles.inputSearch}
          placeholder='Search' />
        <View style={{
          position: "absolute",
          left: 30, bottom: 18
        }}>
          <Ionicons name="search-outline" size={26} color="#878787" />
        </View>

      </View>
      <View style={styles.listProduct}>
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.product}>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center", paddingHorizontal: 10
                }}>
                  <Image style={{
                    height: 30, width: 30, borderRadius: 25
                  }} source={{ uri: item.avatarShop }} />
                  <Text style={{
                    marginLeft: 6, fontWeight: "bold", color: "black"
                  }}>{item.nameShop}</Text>
                </View>
                <View style={{
                  flexDirection: "row", marginTop: 15,
                }}>
                  <View style={{ justifyContent: "center" }}>
                    <CheckBox
                      checkedColor='black'
                      value={selectedItems.includes(item)}
                      onValueChange={() => handleCheckboxChange(item)}
                      checked={selectedItems.filter((selectedItem) => selectedItem.id === item.id).length > 0}

                      onPress={() => handleCheckboxChange(item)}
                    />
                  </View>

                  <Image style={{
                    width: 100, height: 90,
                  }} source={{ uri: item.image }} />
                  <View style={{ marginStart: 7, width: 140, }}>
                    <Text numberOfLines={2}>{item.name}</Text>
                    <View style={{ flexDirection: "row", marginTop: 5, }}>
                      <Text>{item.color} | </Text>
                      <Text>{item.size}</Text>
                    </View>
                    <Text style={{ marginTop: 5, color: "red" }}>{formatPrice(item.price)}</Text>
                    <View style={{
                      flexDirection: "row", width: item.quantity > 9 ? 90 : 80, height: 25, borderRadius: 6,
                      borderWidth: 1, marginTop: 5, alignItems: "center",
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (item.quantity > 1) {
                            handleDecreaseQuantity(item.id)
                          }

                        }}
                        style={{ borderRightWidth: 1, paddingHorizontal: 5 }}>
                        <Ionicons name="remove-outline" color="black" size={15} />
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 8 }}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleIncreaseQuantity(item.id)
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
        />
      </View>
      <View style={{
        height: 60, backgroundColor: "white",
        borderTopWidth: 1, alignItems: "center",
        flexDirection: "row"
      }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <CheckBox
            checkedColor='black'
            onValueChange={() => setSelection(!isSelected)}
            checked={isSelected}
            onPress={() => {
              setSelection(!isSelected)
              if (isSelected) {
                setSelectedItems([])
              } else {
                setSelectedItems(dataCart)
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
    height: "68%",


  }
});

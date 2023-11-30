import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {sanpham} from './data';
import {formatPrice} from './Format';
const CheckoutScreen = ({route}) => {
  const {orderDetails} = route.params;
  const renderDonhang = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 0.5,
          margin: 5,
          borderRadius: 20,
          borderColor: 'gray',
          padding: 5,
        }}>
        <Pressable>
          <View style={styles.itemContainer}>
            <Image source={{uri: item.imageSP}} style={styles.itemImage} />
            <View
              style={{justifyContent: 'center', flex: 1, marginHorizontal: 10}}>
              <Text style={styles.titleItem} numberOfLines={2}>
                {item.nameSP}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text style={styles.itemOption}>{item.size}</Text>
                <View
                  style={{
                    backgroundColor: 'black',
                    width: 1,
                    height: 10,
                    marginHorizontal: 5,
                  }}></View>
                <Text style={styles.itemOption}>{item.color}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.itemGiaSoluong}>
                  {formatPrice(item.priceSP)}
                </Text>
                <Text style={styles.itemGiaSoluong}>
                  Số lượng : {item.soLuong}
                </Text>
              </View>
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
                Voucher của shop
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
              padding: 10,
            }}>
            <Text style={styles.tongTien}>
              Tổng tiền ({item.soLuong} sản phẩm) :
            </Text>
            <Text style={styles.tongTien}>{formatPrice(item.priceSP)}</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={30} color="black" />
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.titleHeader}>Thanh toán</Text>
        </View>
      </View>
      <ScrollView>
        <FlatList
          data={sanpham}
          keyExtractor={item => item.id.toString()}
          renderItem={renderDonhang}
          scrollEnabled={false}
        />
        <View>
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

          <Pressable
            style={{
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              marginVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 15}}>
                Phương thức thanh toán
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Thanh toán khi nhận hàng</Text>
                <MaterialIcons name="navigate-next" size={30} color="black" />
              </View>
            </View>
          </Pressable>
          <View style={{padding: 20, marginHorizontal: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              Chi tiết thanh toán
            </Text>
            <View style={{marginVertical: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.chitietThanhtoan}>Tổng tiền hàng:</Text>
                <Text style={styles.chitietThanhtoan}>
                  {formatPrice(900000000)}
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
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.chitietThanhtoan}>Tổng tiền hàng:</Text>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  {formatPrice(900000000 - 100000)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 10,
        }}>
        <Pressable style={styles.btnThanhtoan}>
          <Text style={styles.btnTitle}>Hủy</Text>
        </Pressable>
        <Pressable style={styles.btnThanhtoan}>
          <Text style={styles.btnTitle}>Mua</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 20,
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  itemImage: {
    height: 100,
    width: 100,
  },
  titleItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemOption: {
    fontSize: 14,
  },
  itemGiaSoluong: {
    fontSize: 16,
    color: 'black',
  },
  btnThanhtoan: {
    width: '40%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  tongTien: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  chitietThanhtoan: {
    color: 'black',
  },
});

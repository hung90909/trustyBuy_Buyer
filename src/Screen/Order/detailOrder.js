import React, { useCallback, useEffect, useState, useRef } from 'react';
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
    TouchableOpacity,
} from 'react-native';
import { API_BASE_URL, DETAIL_ORDER } from '../../config/urls';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiGet } from '../../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default DetailOrder = () => {
    const route = useRoute()
    const { item } = route.params
    const nav = useNavigation()

    const formatPrice = priceSP => {
        if (typeof priceSP === 'number') {
            return `₫${priceSP.toLocaleString('vi-VN')}`;
        } else {
            return 'Giá không hợp lệ';
        }
    };

    const formatDate = (date) => {
        function addLeadingZero(number) {
            return number < 10 ? `0${number}` : `${number}`;
        }
        const dateTimeObject = new Date(date);
        return `${dateTimeObject.getDate()}-${dateTimeObject.getMonth() + 1}-${dateTimeObject.getFullYear()} ${dateTimeObject.getHours()}:${addLeadingZero(dateTimeObject.getMinutes())}`;
    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginLeft: 10,
                    alignItems: 'center',
                    marginBottom: 10,
                    elevation: 3
                }}>
                <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#000000"
                    onPress={() => nav.goBack()}
                />
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={{ color: '#000000', fontWeight: '600', fontSize: 18 }}>
                        Thông tin đơn hàng
                    </Text>
                </View>
            </View>
            <View style={{width:"100%", height:50, alignItems:"flex-end"}}>
                <View style={{
                    width: 180, height: 50, backgroundColor: "#D3D3D3", justifyContent: "center",
                    marginRight:10, borderRadius:5, alignItems:"center"
                    
                }}>
                    <Text style={{fontSize:15, color:"gray", padding:5}}>Trạng thái: {item.status}</Text>
                </View>


            </View>
            <View style={{
                paddingHorizontal: 15, marginTop: 10,
                padding: 10, backgroundColor: "white",
                minHeight: 50
            }}>
                <View style={{ flexDirection: "row" }}>
                    <Image style={{
                        width: 25, height: 25,
                    }} source={require("../../Resource/icon/pin.png")} />
                    <Text style={{
                        fontSize: 15,
                        marginLeft: 10, color: "black",
                        fontWeight: "bold"
                    }}>Địa chỉ nhận hàng</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 35 }}></View>
                    <Text >{item.order_shipping.City}</Text>
                </View>



            </View>
            <View style={{
                marginTop: 10, padding: 10, backgroundColor: "white",
                minHeight: 100
            }}>
                <TouchableOpacity
                onPress={() => {
                    nav.navigate("ShopInformation",{shopId:item.shopId})
                }}
                 style={{
                    flexDirection: "row",
                    justifyContent: "space-between", alignItems: "center", paddingBottom: 10
                }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>{item.name_shop}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text>Xem shop</Text>
                        <Ionicons name='chevron-forward-outline' size={20} />
                    </View>
                </TouchableOpacity>
                <View style={{
                    borderTopWidth: 0.5, borderColor: "gray",
                    flexDirection: "row", padding: 10
                }}>
                    <Image
                        resizeMode="contain"
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={{
                            uri: `${API_BASE_URL}uploads/` + item.product_thumb[0],
                        }}
                    />
                    <View>
                        <Text style={{
                            color: "black"
                        }} numberOfLines={1}>{item.product_name}</Text>
                        <Text style={{ color: "black", marginVertical: 10 }}>x{item.product_attributes.quantity}</Text>
                        <Text style={{ color: "red", }}>{formatPrice(item.product_attributes.price)}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 13 }}>Thời gian đặt hàng: {formatDate(item.crateDate)} </Text>

            </View>

        </View>
    )
}
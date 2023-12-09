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
    TouchableOpacity,
} from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { formatPrice, formatSoldSP } from '../Format';
import { API_BASE_URL, PRODUCT_API } from '../../config/urls';
import { apiGet, apiPost } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';


const Checkouts = ({ navigation }) => {
    const route = useRoute()
    const { item } = route.params
    console.log(item)
    const formatPrice = priceSP => {
        if (typeof priceSP === 'number') {
            return `₫${priceSP.toLocaleString('vi-VN')}`;
        } else {
            return 'Giá không hợp lệ';
        }
    };
    const totalPrice = (price, quantity) => {
        return formatPrice(price * quantity)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name='arrow-back-outline' size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>Thanh toán</Text>
            </View>

            <TouchableOpacity style={{
                backgroundColor: "white", paddingHorizontal: "row", marginTop: 20,
                padding: 10
            }}>
                <View style={{ flexDirection: "row" }}>
                    <Ionicons name='location-outline' size={20} />
                    <Text style={{ marginLeft: 10 }}>Địa chỉ nhận hàng</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ marginLeft: 30, width: "80%" }}>
                        Nguyen Van Hung | 0978378224
                        Toa nha A3, Cong Ty Phan Vat Tu Thiet Bi Phu Tung, Quan Nam Tu Liem, Ha Noi
                    </Text>
                    <Ionicons name='chevron-forward-outline' size={30} />
                </View>

            </TouchableOpacity>
            <View style={{  marginTop: 10 }}>
                <FlatList
                    data={item}
                    keyExtractor={item => item.itemId}
                    renderItem={({ item }) => {
                        return (
                            <View style={{backgroundColor:"white", marginTop:8,
                            padding:10}}>

                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <Image style={{
                                        width: 90, height: 80
                                    }} source={{
                                        uri: 'https://b0aa-116-96-44-199.ngrok-free.app/uploads/' +
                                            item.product_thumb,
                                    }} />
                                    <View style={{ marginStart: 10 }}>
                                        <Text style={{ fontSize: 15, color: "black" }} numberOfLines={1}>{item.name}</Text>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between", width: "65%",
                                            marginTop: 40
                                        }}>
                                            <Text>{formatPrice(item.price)}</Text>
                                            <Text>x{item.quantity}</Text>
                                        </View>
                                    </View>


                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-between",
                               marginTop:20}}>
                                    <Text>Tổng số tiền: </Text>
                                    <Text style={{color:"red", fontWeight:"bold"}}>{totalPrice(item.price, item.quantity)}</Text>
                                </View>

                            </View>
                        )
                    }}
                />
            </View>

            <View style={{flexDirection:"row"}}>
               <Ionicons name='wallet-outline' />
            </View>





        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        backgroundColor: "white",
        elevation: 2,
        paddingHorizontal: 15
    }
}

)
export default Checkouts




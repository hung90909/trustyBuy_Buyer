import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function DaGiao() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDgzODc4NywiZXhwIjoxNzAxNzAyNzg3fQ.RuxO3lv8xnqAG2lwRJwXcq2_z9GThZV3VOfkA7om458"
    const getAllOrderForUser = () => {
        fetch("https://7324-116-96-44-199.ngrok-free.app/v1/api/checkout/getAllOrderForUser/delivered", {
            headers: {
                "x-xclient-id": "654c8a081f10540692bdc998",
                "authorization": token
            }
        })
            .then(item => item.json())
            .then(item => setListProducts(item.message.orderRes.user))
            .catch(err => console.log(err))
    }

    useFocusEffect(
        useCallback(() => {
            getAllOrderForUser();

        }, []),
    );

    const [listProducts, setListProducts] = useState([])

    const onBuyAgain = (id) => {
        fetch("https://7324-116-96-44-199.ngrok-free.app/v1/api/checkout/cancelByUser/" + id, {
            method: "PATCH",
            headers: {
                "x-xclient-id": "654c8a081f10540692bdc998",
                "authorization": token
            }
        }).then(() => nav.navigate("XuLy"))
            .catch(err => console.log(err))
    }


    // const dataOrderDaGiao = [
    //     {
    //         id: 1,
    //         avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    //         nameShop: "Tia To",
    //         image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    //         name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
    //         color: "trăng",
    //         size: "XL",
    //         price: 20000000,
    //         quantity: 3,
    //         status: 0
    //     },
    //     {
    //         id: 2,
    //         avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    //         nameShop: "Tia To",
    //         image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    //         name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
    //         color: "trăng",
    //         size: "XL",
    //         price: 20000000,
    //         quantity: 3,
    //         status: 0
    //     },
    //     {
    //         id: 3,
    //         avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    //         nameShop: "Tia To",
    //         image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
    //         name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
    //         color: "trăng",
    //         size: "XL",
    //         price: 20000000,
    //         quantity: 3,
    //         status: 0
    //     },
    // ]

    const formatPrice = priceSP => {
        return `₫${priceSP.toLocaleString('vi-VN')}`;
    };

    return (
        <View style={styles.container}>
            {listProducts.length > 0 ? <FlatList
                data={listProducts}
                keyExtractor={item => item.oderId}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.itemOrder}>
                            <View style={{
                                flexDirection: "row", alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image style={{
                                        width: 30, height: 30, borderRadius: 16
                                    }} source={{ uri: "https://158f-2a09-bac1-7aa0-50-00-246-66.ngrok-free.app/" + item.avatar_shop }} />
                                    <Text style={{
                                        marginLeft: 6, color: "black"
                                    }}>{item.name_shop}</Text>
                                </View>
                                <Text style={{ color: "black", fontWeight: "bold" }}>Đánh giá</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Image style={{
                                    width: 80, height: 90,
                                }} source={{ uri: "https://7324-116-96-44-199.ngrok-free.app/uploads/" + item.product_thumb[0] }} />
                                <View style={{ width: 200, marginLeft: 15 }}>
                                    <Text style={{
                                        fontWeight: "bold", color: "black",
                                    }} numberOfLines={2}>{item.product_name}</Text>
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 5, width: 200,
                                        justifyContent: "space-between"
                                    }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text>{item?.color ? item.color : "red"} | </Text>
                                            <Text>{item?.size ? item.size : "XL"}</Text>
                                        </View>
                                        <Text>{item.product_attributes.quantity} sản phẩm</Text>

                                    </View>
                                    <Text style={{ color: "red", marginTop: 5 }}>{formatPrice(item.product_attributes.price)}</Text>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "center", alignItems: "center",
                                        marginTop: 5
                                    }}>
                                        <TouchableOpacity style={styles.btnReturns}>
                                            <Text>Yêu cầu trả hàng</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn}>
                                            <Text style={{ color: "white" }}>Mua lại</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>

                        </TouchableOpacity>
                    )
                }}
            /> :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image style={{
                        width: 100, height: 100, tintColor: "gray"
                    }} source={require("../../Resource/Image/order.png")} />
                    <Text style={{ fontSize: 20, marginTop: 10 }}>Chưa có đơn hàng</Text>
                </View>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    itemOrder: {
        marginTop: 20,
        minHeight: 100,
        backgroundColor: "white",
        padding: 10,
        width: "100%",
        borderRadius: 10
    },
    btn: {
        width: 80, height: 30, backgroundColor: "black",
        justifyContent: "center", alignItems: "center",
        padding: 5, borderRadius: 5,
        marginLeft: 10
    },
    btnReturns: {
        width: 120, height: 30, borderRadius: 5, borderWidth: 1,
        justifyContent: "center", alignItems: "center",
    }
})
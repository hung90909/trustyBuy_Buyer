import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export default function DaGiao() {

    const dataOrderDaGiao = [
        {
            id: 1,
            avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
            nameShop: "Tia To",
            image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
            name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
            color: "trăng",
            size: "XL",
            price: 20000000,
            quantity: 3,
            status: 0
        },
        {
            id: 2,
            avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
            nameShop: "Tia To",
            image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
            name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
            color: "trăng",
            size: "XL",
            price: 20000000,
            quantity: 3,
            status: 0
        },
        {
            id: 3,
            avatarShop: "https://th.bing.com/th/id/OIP.4DxmdHCqdqCgoe9rESRuyAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7",
            nameShop: "Tia To",
            image: "https://th.bing.com/th/id/OIP.KUOCcLMoEvgXlpy8_Q_LZQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.7&pid=1.7",
            name: "Đồng Hồ Đeo Tay Thông Minh FD68S Đo Nhịp Tim Huyết Áp Cho Android Ios 2022",
            color: "trăng",
            size: "XL",
            price: 20000000,
            quantity: 3,
            status: 0
        },
    ]

    const formatPrice = priceSP => {
        return `₫${priceSP.toLocaleString('vi-VN')}`;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dataOrderDaGiao}
                keyExtractor={item => item.id}
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
                                    }} source={{ uri: item.avatarShop }} />
                                    <Text style={{
                                        marginLeft: 6, color: "black"
                                    }}>{item.nameShop}</Text>
                                </View>
                                <Text style={{ color: "black", fontWeight: "bold" }}>Đánh giá</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Image style={{
                                    width: 100, height: 90,
                                }} source={{ uri: item.image }} />
                                <View style={{ width: 200 }}>
                                    <Text style={{
                                        fontWeight: "bold", color: "black",
                                    }} numberOfLines={2}>{item.name}</Text>
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 5, width: 200,
                                        justifyContent: "space-between"
                                    }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text>{item.color} | </Text>
                                            <Text>{item.size}</Text>
                                        </View>
                                        <Text>{item.quantity} sản phẩm</Text>

                                    </View>
                                    <Text style={{ color: "red", marginTop: 5 }}>{formatPrice(item.price)}</Text>
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
            />
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
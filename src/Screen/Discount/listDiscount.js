import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL, DISCOUNT_API, USER_API } from '../../config/urls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { apiGet } from '../../utils/utils';
export default ListDiscount = () => {

    const getAllDiscount = async () =>{
        try{
            const res = await apiGet(DISCOUNT_API);
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
       getAllDiscount();
    },[])
    const data = [
        {
            name: 'Giảm giá 20%',
            minOrder: 10,
            disCountStart: "12-12-2023",
        },
        {
            name: 'Giảm giá 25k',
            minOrder: 20,
            disCountStart: "11-12-2023",
        },
        {
            name: 'Giảm giá 10%',
            minOrder: 10,
            disCountStart: "15-12-2023",
        },
        {
            name: 'Giảm giá 50k',
            minOrder: 30,
            disCountStart: "14-12-2023",
        },

    ]
    const [dataDiscount, setDataDiscount] = useState(data)
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                marginTop: 20, marginBottom: 20
            }}>
                <Ionicons name='arrow-back-outline' size={30} color={'black'} />
                <Text style={{
                    color: "black", marginLeft: 10,
                    fontSize: 20
                }}>Mã giảm giá</Text>
            </View>
            <FlatList
                data={dataDiscount}
                keyExtractor={item => item.name}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.itemDiscount}>
                            <View style={{
                                backgroundColor: "black",
                                width: 100, justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}>
                                <Image style={{
                                    width: 50, height: 50,
                                    tintColor: "white"
                                }} source={require("../../Resource/icon/disc.png")} />
                            </View>
                            <View style={{
                                padding:10
                            }}>
                                <Text style={{color:"black", fontSize:18}}>{item.name}</Text>
                                <Text>Đơn tối thiểu {item.minOrder}k</Text>
                                <Text style={{
                                    fontSize:11
                                }}>Có hiệu lực từ: {item.disCountStart}</Text>
                            </View>

                            <TouchableOpacity style={{
                                width:50, height:30, backgroundColor:"black",
                                justifyContent:"center",alignItems:"center",
                                borderRadius:5
                            }}>
                                <Text style={{color:"white"}}>Lưu</Text>
                            </TouchableOpacity>


                        </View>
                    )
                }} />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    itemDiscount: {
        width: "100%",
        height: 80,
        backgroundColor: "white",
        marginTop: 20,
        flexDirection: "row",
        // justifyContent:"center",
        alignItems: "center",
    }
})
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default Success = () =>{
    const nav = useNavigation()
    return(
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Image style={{
                width:100, height:100,
            }} source={require("../Resource/Image/success.png")}/>
            <Text style={{
                fontSize:20, marginTop:10
            }}>Đặt hàng thành công</Text>
            <TouchableOpacity
              onPress={() =>{
                nav.navigate("Main")
              }}
             style={{
                width:150, height:40, borderWidth:1,
                justifyContent:"center", alignItems:"center",
                marginTop:10, borderRadius:10
            }}>
                <Text>Về trang chủ</Text>
            </TouchableOpacity>
        </View>
    )
}
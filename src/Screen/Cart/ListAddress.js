import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    Text,
    View,
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
import { ADD_CART_API, API_BASE_URL, GET_ADDRESS_API, PRODUCT_API } from '../../config/urls';
import { apiGet, apiPost } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view'
import { RadioButton } from 'react-native-paper';

const ListAddress = ({ navigation }) => {
    const nav = useNavigation()
    const route = useRoute()
    const {itemProduct, itemDiscount} = route.params
    const [listAddress, setListAddress] = useState([])
    const [checked, setChecked] = useState(null)
    const [user, setUser] = useState({})

    const getAllAddress = async () => {
        try {
            const res = await apiGet(GET_ADDRESS_API);
            setListAddress(res.message.information.address)
        } catch (error) {
            throw error
        }
    }

    const getUser = async () => {
        try {
            const res = await apiGet(GET_ADDRESS_API);
            setUser(res.message.information)
           
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getAllAddress()
        getUser()
    }, [])

    useEffect(() => {
        if (listAddress.length > 0 && !checked) {
          setChecked(listAddress[0]._id);
        }
      }, [listAddress])
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                flexDirection: "row", height: 60, backgroundColor: "white",
                elevation: 4, alignItems: "center", paddingHorizontal: 20
            }}>
                <TouchableOpacity onPress={() => {
                    nav.goBack()
                }}>
                    <Ionicons name='arrow-back-outline' size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>Chọn địa chỉ</Text>
            </View>

            <FlatList
                data={listAddress}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            width: "100%", minHeight: 70,
                            marginTop: 20, backgroundColor: "white",
                        }}>
                            <View style={{ flexDirection: "row", padding:10 , alignItems:"center"}}>
                                <RadioButton
                                    value={item._id} // Giá trị của nút radio
                                    status={checked === item._id ? 'checked' : 'unchecked'} // Trạng thái của nút radio
                                    onPress={() =>{
                                        setChecked(item._id)
                                        nav.navigate("Checkout",{itemAddress:item, item:itemProduct, itemDiscount:itemDiscount})
                                    } } // Xử lý khi nút radio được chọn
                                />
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text>{item.nameAddress} |</Text>
                                        <Text> 0{user.phoneNumber}</Text>
                                    </View>
                                    <Text>{item.customAddress}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}
export default ListAddress
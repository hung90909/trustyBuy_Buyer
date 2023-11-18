import React,{useState} from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function ListStar(props) {
    // const { numberStar, height, width } = props;
    const [selectItem , setSelectItem] = useState(0)
    const handlePress = (index) =>{
        setSelectItem(index)
    }
    return (
        <ScrollView
         showsHorizontalScrollIndicator={false}
         horizontal>
            {['Tất cả', 5, 4, 3, 2, 1].map((item, index) => {
                return (
                    <TouchableOpacity
                     onPress={() =>{
                        handlePress(index)
                     }}
                     key={item} style={{
                        height: 30, width: 60, borderColor: "gray",
                        justifyContent: "center", alignItems: "center",
                        borderRadius: 15, marginRight: 15,
                        borderWidth: 1, flexDirection: "row",
                        backgroundColor: selectItem === index ? "black" : "white"
                    }}>
                        <Text style={{ color: selectItem === index ? "white" : "black", marginRight: 2 }}>{item}</Text>
                        {index >= 1 && <Ionicons name='star' color={"orange"} />}
                    </TouchableOpacity>


                )
            })}
        </ScrollView>
    )

}

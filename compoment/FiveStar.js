import React from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function FiveStar(props) {
    const {numberStar , height , width} = props;
   return(
     [0,1,2,3,4].map((item)=>{
        return(
            <Image key={item}
            style={{width:height, height:width,marginRight:2, 
            tintColor:item <= numberStar -1 ? '#ffce3d' : 'gray'}}
            source={require("../Resource/icon/star.png")}/>
        )
     })
   )

}
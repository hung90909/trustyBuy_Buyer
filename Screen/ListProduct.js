import React, {useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {danhmucsp, sanphamdanhmuc} from './data';
import {FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
const formatSoldSP = value => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else {
    return value.toString();
  }
};

const formatPrice = priceSP => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'symbol',
  });
  return formatter.format(priceSP);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  productContainer: {
    width: '50%',
    justifyContent: 'center',
    padding: '3%',
  },
  productImage: {
    height: 200,
  },
  productText: {
    color: '#1B2028',
    fontSize: 14,
  },
  priceText: {
    color: '#FC6D26',
    fontSize: 14,
  },
  soldText: {
    color: '#1B2028',
    fontSize: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '4%',
    height: 40,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  inputIconLeft: {
    marginHorizontal: 10,
    opacity: 0.5,
  },
  textInput: {
    flex: 1,
    opacity: 0.5,
  },
  inputIconRight: {
    marginHorizontal: 10,
  },
});

const ListProduct = ({
  route: {
    params: {danhmucspId},
  },
}) => {
  const danhsachSp = useMemo(() => sanphamdanhmuc[danhmucspId], [danhmucspId]);
  const danhmucSp = useMemo(
    () => danhmucsp.find(danhmuc => danhmuc.id === danhmucspId)?.name,
    [danhmucspId],
  );
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <Ionicons
          name="arrow-back"
          size={22}
          color="#000000"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: 'black',
            marginLeft: 20,
          }}>
          {danhmucSp}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.inputIconLeft}
        />
        <TextInput style={styles.textInput} placeholder="Tìm kiếm" />
        {/* Ấn hiện bottom tại đây */}
        <Pressable>
          <FontAwesome
            name="unsorted"
            size={26}
            color="#666"
            style={styles.inputIconRight}
          />
        </Pressable>
      </View>
      <FlatList
        numColumns={2}
        data={danhsachSp}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.productContainer}>
            <Image
              style={styles.productImage}
              source={{uri: item.imageSP}}
              resizeMode="contain"
            />
            <Text style={styles.productText} numberOfLines={2}>
              {item.nameSP}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 25,
                alignItems: 'center',
              }}>
              <Text style={styles.priceText}>{formatPrice(item.priceSP)}</Text>
              <Text style={styles.soldText}>
                Đã bán {formatSoldSP(item.soldSP)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ListProduct;

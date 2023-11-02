import {StyleSheet, Text, View, Pressable, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {danhmucsp} from './data';
import {useNavigation} from '@react-navigation/native';
const Listcategorys = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
    return (
      <Pressable
        style={{
          width: '25%',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setSelectedItem(item);
          navigation.navigate('ListProduct', {
            danhmucspId: item.id,
          });
        }}>
        <Image source={item.image} />
        <Text style={{marginTop: 10, fontWeight: 'bold', color: 'black'}}>
          {item.name}
        </Text>
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={danhmucsp}
        keyExtractor={item => item.id.toString()}
        numColumns={4} // Set the number of columns to 2
        renderItem={renderItem}
        style={{marginHorizontal: 25, marginVertical: 20}}
      />
    </View>
  );
};

export default Listcategorys;

const styles = StyleSheet.create({});

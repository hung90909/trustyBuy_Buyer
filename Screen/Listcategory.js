import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import {danhmucphobien} from './data';

const Listcategory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const renderName = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
    return (
      <Pressable
        style={{
          width: 80,
          height: 30,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
          borderRadius: 20,
          backgroundColor: isSelected ? 'black' : 'white',
        }}
        onPress={() => setSelectedItem(item)}>
        <Text
          style={{
            textAlign: 'center',
            color: isSelected ? 'white' : 'black',
          }}>
          {item.name}
        </Text>
      </Pressable>
    );
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'black',
          marginHorizontal: 20,
        }}>
        Phổ biến nhất
      </Text>
      <FlatList
        data={danhmucphobien}
        keyExtractor={item => item.id}
        renderItem={renderName}
        horizontal={true} // Lướt ngang
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        style={{marginVertical: 20, marginLeft: 20}}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default Listcategory;

const styles = StyleSheet.create({});

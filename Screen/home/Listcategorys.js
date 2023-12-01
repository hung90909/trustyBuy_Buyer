import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import {API_BASE_URL, CATEGORY_API} from '../../API/getAPI';

const Listcategorys = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'x-xclient-id': '654c8a081f10540692bdc998',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDc0NzcyMywiZXhwIjoxNzAxNjExNzIzfQ.e6b2XU7X14vXAilxpFXjwms7kqRcbOI_dQ1UKRS6IRg', // Thay 'your-access-token' bằng giá trị thực tế
        };

        const response = await axios.get(`${CATEGORY_API}/getAllCategory`, {
          headers,
        });

        setData(response.data.message.getAllCategory);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;

    return (
      <Pressable
        style={styles.categoryItem}
        onPress={() => {
          setSelectedItem(item);
          navigation.navigate('ListProduct', {danhmucspId: item.id});
        }}>
        <Image
          style={styles.categoryImage}
          source={{
            uri: `${API_BASE_URL}/${item?.category_thumb}`,
          }}
        />
        <Text style={styles.categoryText}>{item.category_name}</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        scrollEnabled={false}
        keyExtractor={item => item._id}
        numColumns={4}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    width: '25%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    // Add any image styling if needed
  },
  categoryText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  flatList: {
    marginHorizontal: 25,
    marginVertical: 20,
  },
});

export default Listcategorys;

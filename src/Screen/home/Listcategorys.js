import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, FlatList, StyleSheet} from 'react-native';
import {API_BASE_URL, CATEGORY_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';

const Listcategorys = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiGet(`${CATEGORY_API}/getAllCategory`);

      console.log(response);
      // setData(response.message.getAllCategory);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <Pressable style={styles.categoryItem}>
        <Image
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

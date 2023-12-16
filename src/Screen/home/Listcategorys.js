import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, FlatList, StyleSheet} from 'react-native';
import {API_BASE_URL, CATEGORY_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {useNavigation} from '@react-navigation/native';

const Listcategorys = () => {
  const [data, setData] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await apiGet(`${CATEGORY_API}/getAllCategory`);
      setData(response.message.category);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryPress = (categoryId, categoryName, categoryThumb) => {
    navigation.navigate('ListProductInCategory', {
      categoryId: categoryId,
      categoryName: categoryName,
      categoryThumb: categoryThumb, // Truyền categoryThumb qua ListProductInCategory
    });
    setSelectedCategoryId(categoryId);
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        style={styles.categoryItem}
        onPress={() =>
          handleCategoryPress(item._id, item.category_name, item.category_thumb)
        }>
        <Image
          source={{
            uri: `${API_BASE_URL}${item?.category_thumb}`,
          }}
          style={{height: 35, width: 35}}
          resizeMode="contain"
        />
        <Text style={styles.categoryText}>{item.category_name}</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        numColumns={4}
        renderItem={renderItem}
        style={styles.flatList}
        scrollEnabled={false}
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

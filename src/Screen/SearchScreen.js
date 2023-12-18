import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {formatPrice, formatSoldSP} from './Format';
import {apiGet} from '../utils/utils';
import {API_BASE_URL, PRODUCT_API} from '../config/urls';
import {useNavigation} from '@react-navigation/native';
import ListProduct from './ListProduct';
import {Rating} from 'react-native-elements';
const SearchScreen = () => {
  const nav = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSanpham, setFilteredSanpham] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    useState('Giá thấp đến cao');
  const [sortBySales, setSortBySales] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStarFilter, setSelectedStarFilter] = useState(null);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        setLoading(true);
        const response = await apiGet(`${PRODUCT_API}/getAllProductByUser`);
        setData(response?.message?.allProduct);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllProduct();
  }, []);

  const handleInputChange = useCallback(text => {
    setInputValue(formatCurrency(text));
  }, []);

  const handleRetrySearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleSearch = useCallback(
    query => {
      setSearchQuery(query);
      const formattedQuery = query.toLowerCase();
      const filteredProducts =
        query === ''
          ? []
          : data.filter(product =>
              product.product_name.toLowerCase().includes(formattedQuery),
            );
      setFilteredSanpham(filteredProducts);
    },
    [data],
  );

  const handleSortToggle = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleSortOptionSelect = useCallback(
    option => {
      setSelectedOption(option);
      setSortBySales(option === 'Bán chạy');
      setSelectedSortOption(option);
      setModalVisible(false);

      let sortedProducts;

      if (option === 'Giá thấp đến cao' || option === 'Giá cao đến thấp') {
        // Sort by price logic
        sortedProducts = [...filteredSanpham].sort((a, b) => {
          const priceA = a.product_price;
          const priceB = b.product_price;

          return option === 'Giá thấp đến cao'
            ? priceA - priceB
            : priceB - priceA;
        });
      } else if (option === 'Bán chạy') {
        // Sort by sales logic
        sortedProducts = [...filteredSanpham].sort((a, b) => {
          return sortBySales
            ? a.product_sold - b.product_sold
            : b.product_sold - a.product_sold;
        });
      }

      setFilteredSanpham(sortedProducts);
    },
    [filteredSanpham, sortBySales],
  );

  const formatCurrency = useCallback(value => {
    const numericValue = value.replace(/\D/g, '');
    const intValue = parseInt(numericValue, 10);
    const formattedValue = intValue.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    return formattedValue;
  }, []);

  const handleStarFilterSelect = useCallback(
    starFilter => {
      setSelectedStarFilter(starFilter);
      setModalVisible(false);

      let filteredProducts = data;

      if (starFilter) {
        // Filter products based on star rating
        filteredProducts = data.filter(
          product => product.product_ratingAverage === parseInt(starFilter, 10),
        );
      }

      setFilteredSanpham(filteredProducts);
    },
    [data],
  );

  const renderSanpham = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            nav.navigate('DetailProducts', {productId: item._id});
          }}
          style={{
            width: '50%',
            justifyContent: 'center',
            padding: '3%',
          }}>
          <Image
            style={{
              height: 200,
            }}
            source={{
              uri: `${API_BASE_URL}uploads/${item.product_thumb[0]}`,
            }}
            resizeMode="contain"
          />
          <Text style={{color: '#1B2028', fontSize: 14}} numberOfLines={2}>
            {item.product_name}
          </Text>
          <View style={{marginTop: 10}}>
            <Text style={{color: '#FC6D26', fontSize: 14}}>
              {formatPrice(item.product_price)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 25,
                alignItems: 'center',
              }}>
              <Rating
                readonly
                startingValue={item.product_ratingAverage}
                imageSize={10}
              />
              <Text style={{color: '#1B2028', fontSize: 10}}>
                Đã bán {formatSoldSP(item.product_sold)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [nav],
  );

  const renderSortOptions = useCallback(() => {
    const sortOptions = ['Giá thấp đến cao', 'Giá cao đến thấp', 'Bán chạy'];

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {sortOptions.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => handleSortOptionSelect(option)}
            style={[
              styles.sortOption,
              {backgroundColor: selectedOption == option ? 'black' : 'white'},
            ]}>
            <Text
              style={{color: selectedOption === option ? 'white' : 'black'}}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [handleSortOptionSelect, selectedOption]);

  const renderStarFilters = useCallback(() => {
    const starFilters = ['1', '2', '3', '4', '5'];

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        {starFilters.map(starFilter => (
          <TouchableOpacity
            key={starFilter}
            onPress={() => handleStarFilterSelect(starFilter)}
            style={[
              styles.sortOption,
              {
                backgroundColor:
                  selectedStarFilter === starFilter ? 'black' : 'white',
              },
            ]}>
            <Text
              style={{
                color: selectedStarFilter === starFilter ? 'white' : 'black',
              }}>
              {starFilter}
            </Text>
            <Ionicons name="star" color={'#f39c12'} size={12} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [handleStarFilterSelect, selectedStarFilter]);

  return (
    <View style={[styles.container]}>
      <StatusBar />
      <View style={styles.textInputContainer}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#666"
          style={styles.inputIconLeft}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Pressable onPress={handleSortToggle}>
          <FontAwesome
            name="unsorted"
            size={22}
            color="#666"
            style={styles.inputIconRight}
          />
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : searchQuery !== '' && filteredSanpham.length === 0 ? (
        <ScrollView>
          <View style={styles.noResultsContainer}>
            <Image
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
                opacity: 0.5,
              }}
              source={require('../Resource/Image/search-results.png')}
            />
            <Text style={styles.noResultsText}>Không tìm thấy kết quả nào</Text>
            <Text style={styles.noResultsText1}>
              Hãy thử sử dụng các từ khóa chung chung hơn
            </Text>
            <Pressable
              style={{
                borderWidth: 1,
                height: 40,
                paddingHorizontal: 20,
                backgroundColor: 'black',
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onPress={handleRetrySearch}>
              <Text style={{color: 'white', fontWeight: '500'}}>
                Thử lại với từ khóa khác
              </Text>
            </Pressable>
          </View>
          <Text style={{fontWeight: 'bold', color: 'black', marginLeft: 10}}>
            Có thể bạn cũng thích
          </Text>
          <ListProduct />
        </ScrollView>
      ) : (
        <ScrollView>
          {searchQuery !== '' ? (
            <FlatList
              data={filteredSanpham}
              keyExtractor={item => item?._id}
              renderItem={renderSanpham}
              numColumns={2}
              style={{marginBottom: 10}}
              scrollEnabled={false}
            />
          ) : (
            <ListProduct />
          )}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalHeader}>Tùy chọn lọc</Text>
            {renderSortOptions()}
            {renderStarFilters()}
          </View>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.closeModalButton}>
            <Text style={{color: 'white'}}>Đóng</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginVertical: 10,
  },
  inputIconLeft: {
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
  },
  inputIconRight: {
    marginHorizontal: 10,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#EDEDED',
    height: '100%',
    paddingVertical: 100,
  },
  noResultsText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  noResultsText1: {
    fontSize: 14,
    color: 'black',
    opacity: 0.5,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  sortOption: {
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeModalButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
  },
});

export default SearchScreen;

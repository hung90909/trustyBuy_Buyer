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
} from 'react-native';
import React, {useState, useEffect} from 'react';
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
  const [data, setData] = useState(data);
  const [loading, setLoading] = useState(true);
  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  const [inputValue, setInputValue] = useState('');

  const formatCurrency = value => {
    const numericValue = value.replace(/\D/g, '');

    let intValue = parseInt(numericValue, 10);

    const formattedValue = intValue.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    return formattedValue;
  };
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

  const handleInputChange = text => {
    setInputValue(formatCurrency(text));
  };
  const handleRetrySearch = () => {
    setSearchQuery('');
  };

  const handleSearch = query => {
    setSearchQuery(query);

    if (query === '') {
      // Nếu không có tìm kiếm, ẩn danh sách sản phẩm
      setFilteredSanpham([]);
    } else {
      // Nếu có tìm kiếm, lọc danh sách sản phẩm theo tên thông minh hơn
      const formattedQuery = query.toLowerCase();
      const filteredProducts = data.filter(product =>
        product.product_name.toLowerCase().includes(formattedQuery),
      );
      setFilteredSanpham(filteredProducts);
    }
  };

  const renderSanpham = ({item}) => {
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
  };

  return (
    <View style={[styles.container]}>
      <StatusBar />
      {/* Thanh tìm kiếm */}
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
        {/* Ấn hiện bottom tại đây */}
        <Pressable onPress={() => console.log('hihihi')}>
          <FontAwesome
            name="unsorted"
            size={22}
            color="#666"
            style={styles.inputIconRight}
          />
        </Pressable>
      </View>

      {loading ? (
        // Show loading indicator while data is being fetched
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : searchQuery !== '' && filteredSanpham.length === 0 ? (
        // Show no results message and other content
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
        // Show search results or all products
        <ScrollView>
          {searchQuery !== '' ? (
            // Hiển thị kết quả tìm kiếm
            <FlatList
              data={filteredSanpham}
              keyExtractor={item => item?._id}
              renderItem={renderSanpham}
              numColumns={2}
              style={{marginBottom: 10}}
              scrollEnabled={false}
            />
          ) : (
            // Hiển thị tất cả sản phẩm khi chưa có tìm kiếm
            <ListProduct />
          )}
        </ScrollView>
      )}
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
  productContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: '#878787',
    width: '50%',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  productSold: {
    fontSize: 12,
    color: '#878787',
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
  butonSheetl: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSheet: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textButonShet: {
    color: 'black',
    fontWeight: 'bold',
  },
  edtGia: {
    borderWidth: 1,
    width: 150,
    height: 40,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
  },
  butonSheetl1: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textButonShet1: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SearchScreen;

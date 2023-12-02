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
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Bottomsheet from './Bottomsheet';
import ListProduct from './ListProduct';
import {formatPrice, formatSoldSP} from './Format';
import {apiGet} from '../utils/utils';
import {API_BASE_URL, PRODUCT_API} from '../config/urls';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSanpham, setFilteredSanpham] = useState([]);
  const [data, setData] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

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
        const response = await apiGet(`${PRODUCT_API}/getAllProductByUser`);
        setData(response?.message?.allProduct);
      } catch (error) {
        console.error(error);
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
      // Nếu có tìm kiếm, lọc danh sách sản phẩm
      const filteredProducts = data.filter(product =>
        product.product_name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredSanpham(filteredProducts);
    }
  };

  const renderSanpham = ({item}) => {
    return (
      <TouchableOpacity
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
            alignItems: 'center',
          }}>
          <Text style={{color: '#FC6D26', fontSize: 14}}>
            {formatPrice(item.product_price)}
          </Text>
          <Text style={{color: '#1B2028', fontSize: 10}}>
            Đã bán {formatSoldSP(item.product_sold)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Khai báo cho bottom sheet
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);

  // Chiều dài bottom
  const snapPoints = ['80%'];

  // Sự kiện kéo
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View
          style={[
            styles.container,
            {backgroundColor: isOpen ? 'gray' : 'white'},
          ]}>
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
            <Pressable onPress={handlePresentModal}>
              <FontAwesome
                name="unsorted"
                size={22}
                color="#666"
                style={styles.inputIconRight}
              />
            </Pressable>
          </View>

          {searchQuery !== '' && filteredSanpham.length === 0 && (
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
                <Text style={styles.noResultsText}>
                  Không tìm thấy kết quả nào
                </Text>
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
              <Text
                style={{fontWeight: 'bold', color: 'black', marginLeft: 10}}>
                Có thể bạn cũng thích
              </Text>
              <ListProduct />
            </ScrollView>
          )}
          {/* FlatList item */}
          <FlatList
            data={filteredSanpham}
            keyExtractor={item => item?._id}
            renderItem={renderSanpham}
            numColumns={2}
            style={{marginBottom: 10}}
          />
          {/* Bottom Sheet */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{borderRadius: 25}}
            onDismiss={() => setIsOpen(false)}>
            <Bottomsheet />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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

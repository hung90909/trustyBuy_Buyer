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
import React, {useRef, useState} from 'react';
// Khai báo icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {sanphamdanhmuc} from './data';
// Khai báo bottom sheet

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSanpham, setFilteredSanpham] = useState(sanpham);
  const [sanpham, setSanpham] = useState([
    {
      id: '18',
      nameSP:
        'Áo Polo Teelab Special chất cá sấu thoáng mát co dãn local brand | Miễn phí đổi trả 7 ngày',
      imageSP:
        'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfcatdbaq4qscd',
      priceSP: 346476,
      soldSP: 123456,
    },
    {
      id: '19',
      nameSP:
        'Quần AOKANG ống rộng thời trang phong cách Nhật Bản tùy chọn màu sắc cho nam',
      imageSP:
        'https://down-vn.img.susercontent.com/file/e37ae5c2e54e2c0749e1c1ee6f8ccea6',
      priceSP: 345332,
      soldSP: 876824345,
    },
    {
      id: '20',
      nameSP:
        'Đồng Hồ Thông Minh SKMEI Ip68 4G Rom + 1G Ram Có Kết Nối Bluetooth 400MAh',
      imageSP:
        'https://down-vn.img.susercontent.com/file/sg-11134201-22120-kzglycl3unlvf4',
      priceSP: 124323,
      soldSP: 456645,
    },
    {
      id: '21',
      nameSP: 'Giày Boot Nam THE WOLF Minimal Chelsea Boot - Tan',
      imageSP:
        'https://down-vn.img.susercontent.com/file/1c6db1d5260f99d6a0a8f55002ba7412',
      priceSP: 234574,
      soldSP: 464356,
    },
    {
      id: '22',
      nameSP:
        'Áo Polo Teelab Special chất cá sấu thoáng mát co dãn local brand | Miễn phí đổi trả 7 ngày',
      imageSP:
        'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfcatdbaq4qscd',
      priceSP: 346476,
      soldSP: 123456,
    },
    {
      id: '23',
      nameSP:
        'Quần AOKANG ống rộng thời trang phong cách Nhật Bản tùy chọn màu sắc cho nam',
      imageSP:
        'https://down-vn.img.susercontent.com/file/e37ae5c2e54e2c0749e1c1ee6f8ccea6',
      priceSP: 345332,
      soldSP: 876824345,
    },
    {
      id: '24',
      nameSP:
        'Đồng Hồ Thông Minh SKMEI Ip68 4G Rom + 1G Ram Có Kết Nối Bluetooth 400MAh',
      imageSP:
        'https://down-vn.img.susercontent.com/file/sg-11134201-22120-kzglycl3unlvf4',
      priceSP: 124323,
      soldSP: 456645,
    },
    {
      id: '25',
      nameSP: 'Giày Boot Nam THE WOLF Minimal Chelsea Boot - Tan',
      imageSP:
        'https://down-vn.img.susercontent.com/file/1c6db1d5260f99d6a0a8f55002ba7412',
      priceSP: 234574,
      soldSP: 464356,
    },
  ]);

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  const [inputValue, setInputValue] = useState('');

  const formatCurrency = value => {
    // Loại bỏ các ký tự không phải số từ chuỗi nhập vào
    const numericValue = value.replace(/\D/g, '');

    // Chuyển đổi chuỗi thành số nguyên
    let intValue = parseInt(numericValue, 10);

    // Định dạng số thành giá trị tiền tệ (ví dụ: 1000000 -> 1,000,000)
    const formattedValue = intValue.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND', // Đổi thành tiền tệ mong muốn nếu cần
    });

    return formattedValue;
  };

  const handleInputChange = text => {
    setInputValue(formatCurrency(text));
  };
  const handleRetrySearch = () => {
    setSearchQuery(''); // Clear the search query
    // You can also reset any other state variables related to search if needed.
  };

  const formatPrice = priceSP => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'symbol', // Để hiển thị ký hiệu đứng trước số
    });
    return `₫${priceSP.toLocaleString('vi-VN')}`;
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      // Nếu không có tìm kiếm, hiển thị tất cả sản phẩm
      setFilteredSanpham(sanphamdanhmuc);
    } else {
      // Nếu có tìm kiếm, lọc danh sách sản phẩm
      const filteredProducts = sanpham.filter(product =>
        product.nameSP.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredSanpham(filteredProducts);
    }
  };

  const renderSanpham = ({item}) => {
    const formatSoldSP = value => {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`; // Đơn vị "M" cho giá trị lớn hơn hoặc bằng 1,000,000
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`; // Đơn vị "k" cho giá trị lớn hơn hoặc bằng 1,000
      } else {
        return value.toString(); // Giữ nguyên giá trị nếu nhỏ hơn 1,000
      }
    };

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
          source={{uri: item.imageSP}}
          resizeMode="contain"
        />
        <Text style={{color: '#1B2028', fontSize: 14}} numberOfLines={2}>
          {item.nameSP}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
            alignItems: 'center',
          }}>
          <Text style={{color: '#FC6D26', fontSize: 14}}>
            {formatPrice(item.priceSP)}
          </Text>
          <Text style={{color: '#1B2028', fontSize: 10}}>
            Đã bán {formatSoldSP(item.soldSP)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Khai báo cho bottom sheet
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);

  // Chiều dài bottom
  const snapPoints = ['25%', '80%', '100%'];

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
              size={26}
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
                size={26}
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
              <FlatList
                data={sanpham}
                keyExtractor={item => item.id}
                renderItem={renderSanpham}
                numColumns={2}
                scrollEnabled={false}
              />
            </ScrollView>
          )}
          {/* FlatList item */}
          <FlatList
            data={filteredSanpham}
            keyExtractor={item => item.id}
            renderItem={renderSanpham}
            numColumns={2}
            style={{marginBottom: 10}}
          />
          {/* Bottom Sheet */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{borderRadius: 25}}
            onDismiss={() => setIsOpen(false)}>
            <View style={styles.container}>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Tùy chọn tìm kiếm
                </Text>
              </View>
              <View>
                <Text style={styles.textSheet}>Theo mùa</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>Mùa xuân</Text>
                  </Pressable>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>Mùa hạ</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: 10,
                  }}>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>Mùa thu</Text>
                  </Pressable>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>Mùa đông</Text>
                  </Pressable>
                </View>
                <View>
                  <Text style={styles.textSheet}>Sắp xếp</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: 10,
                    }}>
                    <Pressable style={styles.butonSheetl}>
                      <Text style={styles.textButonShet}>Bán chạy</Text>
                    </Pressable>
                    <Pressable style={styles.butonSheetl}>
                      <Text style={styles.textButonShet}>Giá cao thấp</Text>
                    </Pressable>
                    <Pressable style={styles.butonSheetl}>
                      <Text style={styles.textButonShet}>Giá thấp cao</Text>
                    </Pressable>
                  </View>
                </View>
                <View>
                  <Text style={styles.textSheet}>Khoảng giá</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: 10,
                    }}>
                    <TextInput
                      style={styles.edtGia}
                      placeholder="TỐI THIỂU"
                      keyboardType="numeric"
                    />
                    <View
                      style={{
                        height: 0.5,
                        backgroundColor: 'black',
                        width: 20,
                        alignSelf: 'center',
                      }}></View>
                    <TextInput
                      style={styles.edtGia}
                      placeholder="TỐI ĐA"
                      onChangeText={handleInputChange}
                      value={inputValue}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.textSheet}>Đánh giá</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>5 sao</Text>
                  </Pressable>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>4 sao</Text>
                  </Pressable>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>3 sao</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginVertical: 20,
                  }}>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>2 sao</Text>
                  </Pressable>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>1 sao</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 50,
                  }}>
                  <Pressable style={styles.butonSheetl}>
                    <Text style={styles.textButonShet}>Thiết lập lại</Text>
                  </Pressable>
                  <Pressable style={styles.butonSheetl1}>
                    <Text style={styles.textButonShet1}>Áp dụng</Text>
                  </Pressable>
                </View>
              </View>
            </View>
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
    borderWidth: 0.8,
    borderRadius: 10,
    marginHorizontal: '5%',
    marginVertical: 10,
    borderColor: '#878787',
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

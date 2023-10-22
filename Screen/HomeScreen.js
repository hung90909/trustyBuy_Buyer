import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const formatPrice = priceSP => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'symbol', // Để hiển thị ký hiệu đứng trước số
    });
    return `₫${priceSP.toLocaleString('vi-VN')}`;
  };

  const [danhmuc, setDanhmuc] = useState([
    {
      id: '1',
      name: 'Áo',
      image: require('../Resource/Image/ao.png'),
    },
    {
      id: '2',
      name: 'Quần',
      image: require('../Resource/Image/quan.png'),
    },
    {
      id: '3',
      name: 'Mũ',
      image: require('../Resource/Image/mu.png'),
    },
    {
      id: '4',
      name: 'Trang sức',
      image: require('../Resource/Image/trangsuc.png'),
    },
    {
      id: '5',
      name: 'Túi',
      image: require('../Resource/Image/tui.png'),
    },
    {
      id: '6',
      name: 'Đồng hồ',
      image: require('../Resource/Image/dongho.png'),
    },
    {
      id: '7',
      name: 'Nước hoa',
      image: require('../Resource/Image/nuochoa.png'),
    },
    {
      id: '8',
      name: 'Giày',
      image: require('../Resource/Image/giay.png'),
    },
  ]);
  const [danhmucphobien, setDanhmucphobien] = useState([
    {
      id: '9',
      name: 'Tất cả',
    },
    {
      id: '10',
      name: 'Áo',
    },
    {
      id: '11',
      name: 'Quần',
    },
    {
      id: '12',
      name: 'Mũ',
    },
    {
      id: '13',
      name: 'Trang sức',
    },
    {
      id: '14',
      name: 'Túi',
    },
    {
      id: '15',
      name: 'Đồng hồ',
    },
    {
      id: '16',
      name: 'Nước hoa',
    },
    {
      id: '17',
      name: 'Giày',
    },
  ]);
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
  const renderItem = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
    return (
      <TouchableOpacity
        style={{
          width: '25%',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setSelectedItem(item)}>
        <Image source={item.image} />
        <Text style={{marginTop: 10, fontWeight: 'bold', color: 'black'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderName = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
    return (
      <TouchableOpacity
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
      </TouchableOpacity>
    );
  };
  const renderSanpham = ({item}) => {
    const isSelected = selectedItem && selectedItem.id === item.id;
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

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '4%',
            marginVertical: '5%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              style={{width: 50, height: 50, borderRadius: 50}}
              onPress={() => navigation.navigate('Profile')}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginRight: '6%',
                  borderRadius: 50,
                }}
                source={require('../Resource/Image/img.png')}
                resizeMode="contain"
              />
            </Pressable>

            <View style={{marginLeft: 25, justifyContent: 'center'}}>
              <Text style={{fontSize: 14, color: '#1B2028'}}>Xin chào 👋</Text>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#1B2028'}}>
                Iron Man
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              style={{marginRight: 10}}
              name="notifications-outline"
              size={26}
              color="#1B2028"
              onPress={() => navigation.navigate('NotificationScreen')}
            />
            <Ionicons name="chatbubbles-outline" size={26} color="#1B2028" />
          </View>
        </View>

        <View style={{marginHorizontal: 25, marginTop: 20}}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#EDEDED',
            }}>
            <Ionicons name="search-outline" size={26} color="#878787" />
            <Text style={{marginLeft: 10}}>Tìm kiếm</Text>
            <Pressable style={{justifyContent: 'center', marginLeft: 230}}>
              <FontAwesome name="unsorted" size={26} color="black" />
            </Pressable>
          </Pressable>
        </View>

        <View
          style={{
            height: 150,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: 20,
            overflow: 'hidden',
          }}>
          <Swiper autoplay={true} autoplayTimeout={3}>
            <View style={{flex: 1}}>
              <Image
                style={styles.slideshow}
                resizeMode="stretch"
                source={{
                  uri: 'https://intphcm.com/data/upload/banner-thoi-trang-nam.jpg',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Image
                style={styles.slideshow}
                resizeMode="stretch"
                source={{
                  uri: 'https://intphcm.com/data/upload/banner-thoi-trang-nam-dep.jpg',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Image
                style={styles.slideshow}
                resizeMode="stretch"
                source={{
                  uri: 'https://tmluxury.vn/wp-content/uploads/ao-so-mi-nam-dep-tm-luxury.jpg',
                }}
              />
            </View>
          </Swiper>
        </View>

        <FlatList
          scrollEnabled={false}
          data={danhmuc}
          keyExtractor={item => item.id}
          numColumns={4} // Set the number of columns to 2
          renderItem={renderItem}
          style={{marginHorizontal: 25, marginVertical: 20}}
          nestedScrollEnabled={true} // Adjust spacing between columns
        />
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
        <View>
          <FlatList
            scrollEnabled={false}
            data={sanpham}
            keyExtractor={item => item.id}
            renderItem={renderSanpham}
            numColumns={2}
            style={{marginBottom: 10}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  slideshow: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

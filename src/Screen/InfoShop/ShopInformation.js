import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {API_BASE_URL, SHOP_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {formatPrice, formatSoldSP} from '../Format';
import {changeChat} from '../../redux/actions/chat';
import {useSelector} from 'react-redux';

const ShopInformation = ({route}) => {
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(false);
  const {shopId} = route.params;
  const [data, setData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const chatData = useSelector(state => state?.chat?.chatData);

  const chatApi = async () => {
    const isCheck = await changeChat(shopId);
    if (isCheck) {
      console.log(chatData);
      const itemData = chatData.find(item => item.chat.shopId === shopId);
      // navigation.navigate('ChatItem', {
      //   data: {
      //     idRoom: itemData?.chat?._id,
      //     idShop: itemData?.chat?.userId,
      //     useName: itemData?.user?.user_name,
      //     avatar: itemData?.user?.user_avatar,
      //   },
      // });
    }
  };

  const getapi = async () => {
    try {
      const res = await apiGet(`${SHOP_API}/getShop/${shopId}`);
      setData(res?.message);
    } catch (error) {
      console.log('Call api: ', error);
    }
  };

  useEffect(() => {
    getapi();
  }, []);

  const handleProductPress = productId => {
    navigation.navigate('DetailProducts', {productId});
    // console.log(productId);
    setSelectedProductId(productId);
  };

  const renderSanpham = ({item}) => {
    return (
      <Pressable
        onPress={() => handleProductPress(item._id)}
        style={styles.container1}>
        <Image
          style={styles.imageSP}
          source={{
            uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}`,
          }}
          resizeMode="contain"
        />

        <Text style={styles.nameSp} numberOfLines={2}>
          {item.product_name}
        </Text>
        <View style={styles.containerGia}>
          <Text style={styles.giaSp}>{formatPrice(item.product_price)}</Text>
          <Text style={styles.daBan}>
            Đã bán {formatSoldSP(item.product_sold)}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={26}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Pressable
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search-outline" size={26} color="black" />
            <Text style={styles.searchText}>Tìm kiếm</Text>
          </Pressable>
        </View>

        {/* Thông tin cửa hàng */}
        <View style={styles.shopInfoContainer}>
          <Image
            source={{
              uri: `${API_BASE_URL}${data?.shop?.avatarShop}`,
            }}
            style={styles.shopLogo}
          />
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>{data?.shop?.nameShop}</Text>
            <View style={styles.shopActions}>
              <Pressable
                style={styles.shopActionButton}
                onPress={() => setIsFollowing(!isFollowing)}>
                <AntDesign
                  name={isFollowing ? 'check' : 'plus'}
                  size={16}
                  color="black"
                />
                <Text style={styles.actionButtonText}>
                  {isFollowing ? 'Đang theo dõi' : 'Theo dõi shop'}
                </Text>
              </Pressable>

              <Pressable onPress={chatApi} style={styles.shopActionButton}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={16}
                  color="black"
                />
                <Text style={styles.actionButtonText}>Chat với shop</Text>
              </Pressable>
            </View>
            <View style={styles.shopRating}>
              <Image
                style={styles.starIcon}
                source={require('../../Resource/Image/star.png')}
              />
              <Text style={styles.ratingText}>4.9/5.0</Text>
              <View style={styles.ratingSeparator} />
              <Text style={styles.followersText}>
                {data?.shop?.follower.length} Người theo dõi
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Sản phẩm của shop</Text>
        <FlatList
          data={data?.products || []} // Use data?.products if available, or an empty array as a fallback
          scrollEnabled={false}
          renderItem={renderSanpham}
          keyExtractor={item => item._id}
          numColumns={2}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#F1F1F1',
  },
  searchText: {
    marginLeft: 10,
    color: 'black',
  },
  shopInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  shopLogo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  shopDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  shopName: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  shopActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  shopActionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'black',
    marginLeft: 5,
  },
  shopRating: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  starIcon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  ratingText: {
    color: 'black',
  },
  ratingSeparator: {
    height: 15,
    width: 1,
    alignSelf: 'center',
    marginHorizontal: 10,
    backgroundColor: 'black',
  },
  followersText: {
    color: 'black',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  productItem: {
    width: '50%',
    justifyContent: 'center',
    padding: '3%',
  },
  productImage: {
    height: 200,
  },
  productName: {
    color: '#1B2028',
    fontSize: 14,
    marginTop: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    alignItems: 'center',
  },
  productPrice: {
    color: '#FC6D26',
    fontSize: 14,
  },
  productSold: {
    color: '#1B2028',
    fontSize: 10,
  },
  imageSP: {
    width: '100%',
    height: 200,
  },
  nameSp: {
    color: '#1B2028',
    fontSize: 14,
  },
  containerGia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    alignItems: 'center',
  },
  giaSp: {
    color: '#FC6D26',
    fontSize: 14,
  },
  daBan: {
    color: '#1B2028',
    fontSize: 10,
  },
  container1: {
    width: '50%',
    justifyContent: 'center',
    padding: '3%',
  },
});

export default ShopInformation;

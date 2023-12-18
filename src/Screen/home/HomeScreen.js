import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slideshow from './Slideshow';
import Listproducts from './Listproducts';
import Listcategorys from './Listcategorys';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';
import {fetchData} from '../../redux/actions/socket';
import {useSelector} from 'react-redux';
import ListProduct from '../ListProduct';
import {apiGet, setItem} from '../../utils/utils';
import {saveNotiData} from '../../redux/actions/chat';
import {formatPrice, formatSoldSP} from '../Format';
import {Rating} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  const userAccount = useSelector(state => state?.user?.userData);
  const notifiCount = useSelector(state => state?.chat?.notifi);
  const account = useSelector(state => state?.user?.userData);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const getAllProduct = async pageNumber => {
    try {
      const response = await apiGet(
        `${PRODUCT_API}/getAllProductByUser?page=${pageNumber}`,
      );

      if (response && response.message && response.message.allProduct) {
        const sortedProducts = response.message.allProduct.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });
        setProducts(prevProducts =>
          pageNumber === 1
            ? sortedProducts
            : [...prevProducts, ...sortedProducts],
        );
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoadingMore(false);
    }
  };
  const onRefresh = () => {
    fetchData();
    getAllProduct(1); // Refresh the data by loading the first page
    setRefreshing(false);
  };

  const onEndReached = () => {
    if (!loadingMore) {
      setPage(prevPage => prevPage + 1);
      setLoadingMore(true);
    }
  };
  useEffect(() => {
    fetchData();
    getAllProduct(1); // Load the initial page
  }, []);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToNotification = () => {
    saveNotiData(0);
    setItem('notifi', 0);
    navigation.navigate('NotificationScreen');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };
  const handleProductPress = productId => {
    navigation.navigate('DetailProducts', {productId});
    setSelectedProductId(productId);
  };

  const renderProduct = ({item}) => {
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

        <View style={styles.containerInfo}>
          <Text style={styles.priceSp}>{formatPrice(item.product_price)}</Text>

          <View style={styles.ratingContainer}>
            <Rating
              readonly
              startingValue={item?.product_ratingAverage}
              imageSize={10}
            />
            <Text style={styles.soldText}>
              Đã bán {formatSoldSP(item.product_sold)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <StatusBar />
        <View style={styles.header}>
          <View style={styles.profile}>
            <Pressable style={styles.profileButton} onPress={navigateToProfile}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: `${API_BASE_URL}${userAccount?.avatar}`,
                }}
                resizeMode="cover"
              />
            </Pressable>
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>Xin chào 👋</Text>
              <Text style={styles.profileTextBold}>
                {userAccount?.fullName}
              </Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Pressable>
              <Ionicons
                style={styles.headerIcon}
                name="notifications-outline"
                size={26}
                color="#1B2028"
                onPress={navigateToNotification}
              />
              {notifiCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 12}}>
                    {notifiCount > 9 ? '9+' : notifiCount}
                  </Text>
                </View>
              )}
            </Pressable>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart-outline" size={26} color="#1B2028" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <Pressable style={styles.searchButton} onPress={navigateToSearch}>
            <Ionicons name="search-outline" size={20} color="#878787" />
            <Text style={styles.searchText}>Tìm kiếm</Text>
          </Pressable>
        </View>
        <Slideshow />
        <Listcategorys />
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item?._id}
          numColumns={2}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1} // Adjust the threshold as needed
          scrollEnabled={false}
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
    justifyContent: 'space-between',
    marginHorizontal: '4%',
    marginVertical: '5%',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileImage: {
    width: 60,
    height: 60,
    marginRight: '6%',
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 25,
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 14,
    color: '#1B2028',
  },
  profileTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B2028',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  searchBar: {
    marginHorizontal: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 2,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
  },
  searchText: {
    marginLeft: 10,
  },
  imageSP: {
    width: '100%',
    height: 200,
  },
  nameSp: {
    color: '#1B2028',
    fontSize: 14,
    flex: 1,
  },
  containerInfo: {
    marginTop: 10,
  },
  priceSp: {
    color: '#FC6D26',
    fontSize: 14,
    flex: 1,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  soldText: {
    color: '#1B2028',
    fontSize: 10,
  },
  container1: {
    width: '48%',
    justifyContent: 'center',
    padding: '3%',
    backgroundColor: 'white',
    marginRight: '1%',
    marginLeft: '1%',
  },
});

export default HomeScreen;

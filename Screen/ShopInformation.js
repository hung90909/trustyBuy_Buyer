import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Listproducts from './Listproducts';

const ShopInformation = () => {
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={26} color="black" />
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
              uri: 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-adidas-vector-inkythuatso-01-29-09-08-58.jpg',
            }}
            style={styles.shopLogo}
          />
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>Adidas Việt Nam</Text>
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

              <Pressable style={styles.shopActionButton}>
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
                source={require('../Resource/Image/star.png')}
              />
              <Text style={styles.ratingText}>4.9/5.0</Text>
              <View style={styles.ratingSeparator} />
              <Text style={styles.followersText}>345.6k Người theo dõi</Text>
            </View>
          </View>
        </View>

        {/* Sản phẩm bán chạy nhất */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm bán chạy</Text>
          <Listproducts />
        </View>

        {/* Tất cả sản phẩm */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tất cả sản phẩm</Text>
          <Listproducts />
        </View>
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
});

export default ShopInformation;

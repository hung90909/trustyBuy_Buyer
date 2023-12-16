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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slideshow from './Slideshow';
import Listproducts from './Listproducts';
import Listcategorys from './Listcategorys';
import {API_BASE_URL} from '../../config/urls';
import {fetchData} from '../../redux/actions/socket';
import {useSelector} from 'react-redux';
import ListProduct from '../ListProduct';

const HomeScreen = ({navigation}) => {
  const userAccount = useSelector(state => state?.user?.userData);
  const notifiCount = useSelector(state => state?.chat?.notifi);
  const account = useSelector(state => state?.user?.userData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Perform the data fetching logic here
    fetchData();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
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
        <ListProduct />
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
});

export default HomeScreen;

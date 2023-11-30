import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slideshow from './Slideshow';
import Listproducts from './Listproducts';
import Listcategorys from './Listcategorys';

const HomeScreen = ({navigation}) => {
  // async function getToken() {
  //   const token = await AsyncStorage.getItem('access_token');
  //   const tokenUser = token ? JSON.parse(token) : null;
  //   console.log('Token save : ', tokenUser);
  // }

  // useEffect(() => {
  //   getToken();
  // }, []);
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <View style={styles.header}>
          <View style={styles.profile}>
            <Pressable style={styles.profileButton} onPress={navigateToProfile}>
              <Image
                style={styles.profileImage}
                source={require('../Resource/Image/img.png')}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>Xin chào 👋</Text>
              <Text style={styles.profileTextBold}>Iron Man</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons
              style={styles.headerIcon}
              name="notifications-outline"
              size={26}
              color="#1B2028"
              onPress={navigateToNotification}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Cart');
              }}>
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
        <Listproducts navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  searchText: {
    marginLeft: 10,
  },
});

export default HomeScreen;

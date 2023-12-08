import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Logout from './Logout';
import {useNavigation} from '@react-navigation/native';
import {API_BASE_URL, USER_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {useIsFocused} from '@react-navigation/native';
const ProfileScreen = () => {
  const [user, setUser] = useState({});

  const fetchData = async () => {
    try {
      const res = await apiGet(`${USER_API}/getProfile`);
      setUser(res.message.checkUser.information);
      console.log(res.message.checkUser.information);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [useIsFocused()]);

  const nav = useNavigation();
  const [showLogout, setShowLogout] = useState(false);
  const features = [
    {
      name: 'Edit profile',
      image: require('../../Resource/icon/user.png'),
    },
    {
      name: 'Address',
      image: require('../../Resource/icon/pin.png'),
    },
    {
      name: 'Notification',
      image: require('../../Resource/icon/notification.png'),
    },
    {
      name: 'Message',
      image: require('../../Resource/icon/speech-bubble.png'),
    },
    {
      name: 'Change password',
      image: require('../../Resource/icon/padlock.png'),
    },
    {
      name: 'Setting',
      image: require('../../Resource/icon/settings.png'),
    },
  ];
  const handleFeatureClick = featureName => {
    switch (featureName) {
      case 'Edit profile':
        nav.navigate('EditProfile');
        break;
      case 'Address':
        nav.navigate('AdressScreen');
        break;
      case 'Change password':
        nav.navigate('ChangePassword');
        break;
      case 'Notification':
        nav.navigate('NotificationScreen');
        break;
      case 'Message':
        nav.navigate('ChatScreen');
        break;
      case 'Setting':
        console.log('Setting');
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container_profile}>
      <View style={styles.header_profile}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../Resource/Image/shopping-bag.png')}
            style={[styles.icon_profile, {marginRight: 10}]}
          />
          <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
            Profile
          </Text>
        </View>
        <Image
          source={require('../../Resource/icon/menu.png')}
          style={styles.icon_profile}
        />
      </View>
      <View style={styles.infor_profile}>
        <View style={styles.avatar_container}>
          <Image
            style={styles.avatar}
            source={{
              uri: `${API_BASE_URL}${user?.avatar}`,
            }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: 'black',
            marginTop: 10,
            marginBottom: 5,
          }}>
          {user?.fullName}
        </Text>
      </View>
      {features.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleFeatureClick(item.name)}>
          <View key={index} style={styles.feature_item}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={item.image}
                style={[styles.icon_profile, {marginRight: 15}]}
              />
              <Text style={{color: 'black', fontWeight: '500', fontSize: 15}}>
                {item.name}
              </Text>
            </View>
            <Image
              source={require('../../Resource/icon/next.png')}
              style={{width: 15, height: 15}}
            />
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
        <View style={styles.feature_item}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../Resource/icon/logout.png')}
              style={[styles.icon_profile, {marginRight: 15}]}
            />
            <Text style={{color: 'red', fontWeight: '500', fontSize: 16}}>
              Logout
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {showLogout && (
        <Logout visible={showLogout} onClose={() => setShowLogout(false)} />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container_profile: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header_profile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon_profile: {
    width: 25,
    height: 25,
  },
  infor_profile: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d0d0d0',
    paddingBottom: 20,
    marginBottom: 20,
  },
  feature_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  avatar_container: {
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  edit_icon_container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 20,
  },
  edit_icon: {
    width: 17,
    height: 17,
  },
});

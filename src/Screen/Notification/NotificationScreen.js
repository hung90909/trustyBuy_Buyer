import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {apiGet} from '../../utils/utils';
import {NOTIFICATION_API} from '../../config/urls';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [listNotification, setListNotification] = useState();
  const [loading, setLoading] = useState(true);
  const getNotification = async () => {
    setLoading(true);
    try {
      const res = await apiGet(NOTIFICATION_API);
      console.log(res);
      setListNotification(res?.message.reverse());
    } catch (err) {
      console.log(err);
    } finally {
      // Khi load xong dữ liệu, đặt trạng thái loading là false
      setLoading(false);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);

  const renderItem = ({item}) => {
    const notificationDate = moment(item?.createdAt);

    const now = moment();

    const isToday = notificationDate.isSame(now, 'day');
    const yearsDifference = now.diff(notificationDate, 'years');
    const monthsDifference = now.diff(notificationDate, 'months');
    const daysDifference = now.diff(notificationDate, 'days');
    const hoursDifference = now.diff(notificationDate, 'hours');
    const minutesDifference = now.diff(notificationDate, 'minutes');

    let timeAgo = '';
    if (isToday) {
      timeAgo = `Hôm nay, ${notificationDate.format('HH:mm')}`;
    } else if (yearsDifference > 0) {
      timeAgo = notificationDate.format('HH:mm, DD/MM/YYYY');
    } else if (monthsDifference > 0) {
      if (monthsDifference >= 12) {
        timeAgo = '1 năm trước';
      } else {
        timeAgo = `${monthsDifference} tháng trước`;
      }
    } else if (daysDifference >= 7) {
      timeAgo = `${Math.floor(daysDifference / 7)} tuần trước`;
    } else if (daysDifference > 0) {
      timeAgo = `${daysDifference} ngày trước`;
    } else if (hoursDifference > 0) {
      timeAgo = `${hoursDifference} giờ trước`;
    } else if (minutesDifference > 0) {
      timeAgo = `${minutesDifference} phút trước`;
    } else {
      timeAgo = 'Vừa xong';
    }

    return (
      <TouchableOpacity style={styles.notificationItem}>
        <Image
          resizeMode="cover"
          source={require('../../Resource/icon/notification-bell.png')}
          style={styles.notificationImage}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{item.noti_content}</Text>
          <Text style={styles.notificationContent}>
            {item.noti_options.product_name}
          </Text>
          <Text style={styles.notificationTime}>{timeAgo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#333333"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Thông báo</Text>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <FlatList
          data={listNotification}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          style={styles.notificationList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333333',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  notificationImage: {
    width: 60,
    height: 60,
  },
  notificationTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  notificationTitle: {
    fontSize: 15,
    color: 'black',
    textTransform: 'uppercase',
  },
  notificationContent: {
    fontSize: 13,
    color: '#333333',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666666',
  },
  notificationList: {
    flex: 1,
  },
});

export default NotificationScreen;

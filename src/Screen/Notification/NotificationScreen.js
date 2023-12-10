import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiGet} from '../../utils/utils';
import {NOTIFI_API} from '../../config/urls';
import moment from 'moment';

const NotificationScreen = ({navigation}) => {
  const [data, setData] = useState(null);

  const getAPI = async () => {
    try {
      const res = await apiGet(`${NOTIFI_API}`);
      setData(res?.message.reverse());
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAPI();
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
      <TouchableOpacity
        onPress={() => navigation.navigate('NotiItem', {item})}
        style={styles.notificationItem}>
        <Image
          resizeMode="contain"
          source={{
            uri: 'https://th.bing.com/th/id/OIP.iZrlA44xilXu5howRorUOAHaE8?w=278&h=185&c=7&r=0&o=5&pid=1.7',
          }}
          style={styles.notificationImage}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{item?.noti_content}</Text>
          <Text style={styles.notificationTime}>{timeAgo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#333333"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Thông báo</Text>
      </View>
      {!data ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?._id}
          renderItem={renderItem}
        />
      )}
    </View>
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
  },
  notificationContent: {
    fontSize: 13,
    color: '#333333',
    marginVertical: 10,
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

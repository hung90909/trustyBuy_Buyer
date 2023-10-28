import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [thongbao, setThongbao] = useState([
    {
      id: 1,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'Cùng nhập hội Beauty Club, ưu đãi ngập tràn!',
      content:
        '🎁 Voucher -50% mỗi thứ 3 hàng tuần 🌟 Giá độc quyền giảm đến 50%💌 Ưu đãi dành riêng thành viên từ các thương hiệu làm đẹp▶️ ĐĂNG KÝ THÀNH VIÊN MIỄN PHÍ NGAY!',
      day: 12,
      month: 10,
      year: 2023,
      hour: 14,
      minute: 30,
    },
    {
      id: 2,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'FLASH SALE ĐẾN 50% SIÊU NHIỀU',
      content:
        '⌚ Deal nào cũng có, sale cực sốc đến 50% 👗 Thời trang, mỹ phẩm, bách hóa, gia dụng 🔍 Tìm gì cũng có - Quẹo vào chốt ngay',
      day: 2,
      month: 10,
      year: 2023,
      hour: 14,
      minute: 30,
    },
    {
      id: 3,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'TIẾT KIỆM HƠN VỚI FREESHIP XTRA',
      content:
        '🚚 Giảm đến 300.000Đ phí ship💥 Lưu thêm 1 mã Freeship 45.000Đ💰 Sale 50% muốn gì cũng có🏢 2 tầng ưu đãi, mua là lãi',
      day: 6,
      month: 10,
      year: 2023,
      hour: 14,
      minute: 30,
    },
    {
      id: 4,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'MUA GÌ CŨNG RẺ CHỈ TỪ 9.000Đ',
      content:
        '🧽Thời trang, gia dụng, mỹ phẩm💈Muốn gì cũng có, đã sale còn Freeship🧴Loạt sản phẩm xịn giảm sâu hơn 50% 🌠Chốt đơn liền nào',
      day: 8,
      month: 10,
      year: 2023,
      hour: 14,
      minute: 30,
    },
    {
      id: 5,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'THỨ 4 SIÊU SALE FREESHIP',
      content:
        '💻Hàng công nghệ, thực phẩm, thời trang🔮Deal sốc mỗi ngày, giảm ngay nửa giá🎊Chốt đơn thôi',
      day: 22,
      month: 10,
      year: 2023,
      hour: 14,
      minute: 30,
    },
    {
      id: 6,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'Ở ĐÂY CÓ VOUCHER GIẢM ĐẾN 500.000Đ',
      content:
        '🎈X4 mã Freeship đơn từ 0đ👉Giảm đến 50.000đ đơn 250.000đ👉Giảm đến 150.000đ đơn 750.000đ💐Mua ngay kẻo lỡ',
      day: 22,
      month: 10,
      year: 2023,
      hour: 14,
      minute: 2,
    },
    {
      id: 7,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'MUA GÌ CŨNG RẺ CHỈ TỪ 9.000Đ',
      content:
        '🧽Thời trang, gia dụng, mỹ phẩm💈Muốn gì cũng có, đã sale còn Freeship🧴Loạt sản phẩm xịn giảm sâu hơn 50% 🌠Chốt đơn liền nào',
      day: 22,
      month: 10,
      year: 2023,
      hour: 2,
      minute: 30,
    },
    {
      id: 8,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'THỨ 4 SIÊU SALE FREESHIP',
      content:
        '💻Hàng công nghệ, thực phẩm, thời trang🔮Deal sốc mỗi ngày, giảm ngay nửa giá🎊Chốt đơn thôi',
      day: 22,
      month: 10,
      year: 2023,
      hour: 3,
      minute: 30,
    },
    {
      id: 9,
      image:
        'https://down-vn.img.susercontent.com/file/vn-50009109-bcdb6cc8d948ab44af3deeb04c488f01',
      title: 'Ở ĐÂY CÓ VOUCHER GIẢM ĐẾN 500.000Đ',
      content:
        '🎈X4 mã Freeship đơn từ 0đ👉Giảm đến 50.000đ đơn 250.000đ👉Giảm đến 150.000đ đơn 750.000đ💐Mua ngay kẻo lỡ',
      day: 22,
      month: 10,
      year: 2020,
      hour: 1,
      minute: 30,
    },
  ]);
  const renderItem = ({item}) => {
    const notificationDate = moment(
      `${item.day}/${item.month}/${item.year} ${item.hour}:${item.minute}`,
      'DD/MM/YYYY HH:mm',
    );
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
          source={{uri: item.image}}
          style={styles.notificationImage}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationContent}>{item.content}</Text>
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
          onPress={() => navigation.navigate('Home')}
        />
        <Text style={styles.headerText}>Thông báo</Text>
      </View>
      <FlatList
        data={thongbao}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={styles.notificationList}
      />
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

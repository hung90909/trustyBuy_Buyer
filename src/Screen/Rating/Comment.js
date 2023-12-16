import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-elements';
import {API_BASE_URL} from '../../config/urls';
import {formatMessageTime} from '../../compoment/DateTime';

const Comment = ({navigation, data}) => {
  console.log(data?.reviews);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailRating', {data})}
        style={styles.headerContainer}>
        <View>
          <Text style={styles.reviewTitle}>Đánh giá sản phẩm</Text>
          <View style={styles.ratingContainer}>
            <Rating
              readonly
              startingValue={data?.product_ratingAverage}
              imageSize={16}
            />
            <Text style={styles.ratingText}>
              {data?.product_ratingAverage}/5 (
              {Array.isArray(data?.reviews) ? data?.reviews.length : 0} đánh
              giá)
            </Text>
          </View>
        </View>
        <View style={styles.viewAllContainer}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <AntDesign name="right" color={'red'} />
        </View>
      </TouchableOpacity>
      {Array.isArray(data?.reviews) ? (
        <FlatList
          data={data?.reviews?.slice(0, 3)}
          scrollEnabled={false}
          keyExtractor={item => item?._id.toString()}
          renderItem={({item}) => <ReviewItem item={item} />}
        />
      ) : (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: '20%',
          }}>
          <Text style={{fontSize: 15, marginTop: 20, fontWeight: 'bold'}}>
            Sản phẩm chưa có đánh giá nào?
          </Text>
        </View>
      )}
    </View>
  );
};

const ReviewItem = ({item}) => {
  return (
    <View style={styles.reviewItemContainer}>
      <View style={{width: '80%'}}>
        <View style={styles.reviewItemLeft}>
          <Image
            style={styles.avatar}
            source={{uri: `${API_BASE_URL}${item?.user?.information?.avatar}`}}
          />
          <View>
            <Text style={styles.reviewItemName}>
              {item?.user?.information?.fullName}
            </Text>
            <View>
              <Text numberOfLines={2} style={styles.reviewItemComment}>
                {item?.comment}
              </Text>
              <Text style={styles.reviewItemDate}>
                {formatMessageTime(item?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{item?.rating}</Text>
        <Ionicons name="star" color={'#f39c12'} size={12} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
    marginVertical: '1%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewTitle: {
    marginTop: 5,
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 8,
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 12,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: 'red',
    marginRight: 5,
  },
  reviewItemContainer: {
    elevation: 3,
    padding: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  reviewItemLeft: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  reviewItemName: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  reviewItemDate: {
    color: '#7f8c8d',
    marginTop: 5,
    fontSize: 10,
  },
  reviewItemComment: {
    lineHeight: 20,
    color: '#34495e',
    marginTop: 5,
  },
  ratingBadge: {
    width: 70,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
});

export default Comment;

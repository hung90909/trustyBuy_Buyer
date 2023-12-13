import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Rating} from 'react-native-elements';
import {formatMessageTime} from './DateTime';

const Comment = () => {
  const [selectedRating, setSelectedRating] = useState('Tất cả');

  const handleRatingSelect = rating => {
    setSelectedRating(rating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.reviewTitle}>Đánh giá sản phẩm</Text>
      <View style={styles.ratingContainer}>
        <Rating
          startingValue={5}
          imageSize={24}
          readonly
          ratingBackgroundColor="#FFD700"
        />
        <Text style={styles.ratingText}>5/5 (2.005 đánh giá)</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.ratingFilterContainer}>
        {['Tất cả', '5', '4', '3', '2', '1'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.ratingFilterItem,
              {backgroundColor: selectedRating === item ? 'black' : 'white'},
            ]}
            onPress={() => handleRatingSelect(item)}>
            <Text
              style={[
                styles.ratingFilterText,
                {color: selectedRating === item ? 'white' : 'black'},
              ]}>
              {item}
            </Text>
            {item !== 'Tất cả' && (
              <AntDesign name="star" size={20} color={'#f39c12'} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={[
          {
            _id: 1,
            avatar:
              'https://i.ytimg.com/vi/C3UJBMAy5xE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAt3-G3WFim3YEDksH4KI1038nJKw',
            name: 'Nguyễn Tiến Dũng',
            comment: 'Sản phẩm rất tuyệt vời',
            rating: 5,
            createdAt: '2023-12-05T12:06:05.950+00:00',
          },
          {
            _id: 2,
            avatar:
              'https://i.ytimg.com/vi/C3UJBMAy5xE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAt3-G3WFim3YEDksH4KI1038nJKw',
            name: 'Nguyễn Văn HH',
            comment: 'Sản phẩm rất tuyệt vời',
            rating: 4,
            createdAt: '2023-12-05T12:06:05.950+00:00',
          },
        ]}
        scrollEnabled={false}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => <ReviewItem item={item} />}
      />
    </View>
  );
};

const ReviewItem = ({item}) => {
  return (
    <View style={styles.reviewItemContainer}>
      <View style={{width: '80%'}}>
        <View style={styles.reviewItemLeft}>
          <Image style={styles.avatar} source={{uri: item.avatar}} />
          <Text style={styles.reviewItemName}>{item.name}</Text>
        </View>
        <View style={styles.reviewItemRight}>
          <Text numberOfLines={2} style={styles.reviewItemComment}>
            {item.comment}
          </Text>
          <Text style={styles.reviewItemDate}>
            {formatMessageTime(item.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{item.rating}</Text>
        <AntDesign name="star" color={'#f39c12'} size={18} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
  },
  reviewTitle: {
    marginTop: 10,
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 20,
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
    fontSize: 16,
  },
  ratingFilterContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  ratingFilterItem: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ratingFilterText: {
    fontWeight: 'bold',
  },
  reviewItemContainer: {
    elevation: 3,
    padding: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  reviewItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewItemName: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  reviewItemRight: {
    width: '50%',
  },
  reviewItemDate: {
    color: '#7f8c8d',
    marginTop: 5,
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
    borderWidth: 1,
    borderColor: '#f39c12',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginLeft: 'auto',
  },
  ratingText: {
    marginRight: 5,
    color: '#f39c12',
    fontWeight: 'bold',
  },
});

export default Comment;

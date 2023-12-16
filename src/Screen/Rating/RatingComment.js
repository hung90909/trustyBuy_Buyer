import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import {Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';
import {apiPost} from '../../utils/utils';

const RatingComment = ({navigation, route}) => {
  const {productId, name, avatar} = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingSubmit = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập đánh giá và bình luận trước khi gửi.',
      );
      return;
    }

    if (rating < 1 || rating > 5) {
      Alert.alert(
        'Thông báo',
        'Đánh giá phải nằm trong khoảng từ 1 đến 5 sao.',
      );

      return;
    }

    try {
      const res = await apiPost(`${PRODUCT_API}/reviewProduct/${productId}`, {
        rating: rating,
        comment: comment,
      });

      // Alert.alert('Thành công', 'Cảm ơn bạn đã đánh giá sản phẩm!');
      ToastAndroid.show('Cảm ơn bạn đã đánh giá sản phẩm ', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.log('Lỗi', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đánh giá sản phẩm</Text>
      <Image
        style={styles.productImage}
        source={{uri: `${API_BASE_URL}uploads/${avatar}`}}
      />

      <Text style={styles.productName}>{name}</Text>

      <Rating
        onFinishRating={setRating}
        style={styles.rating}
        imageSize={30}
        ratingColor="#FFD700"
        ratingBackgroundColor="#E0E0E0"
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          placeholder="Đánh giá của bạn về sản phẩm..."
          style={styles.commentInput}
          multiline
          value={comment}
          onChangeText={setComment}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleRatingSubmit}>
        <Icon name="paper-plane" size={20} color="#fff" />
        <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
      </TouchableOpacity>

      <Image
        style={styles.successImage}
        source={require('../../Resource/Image/rating.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  rating: {
    marginVertical: 10,
  },
  commentInputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  commentInput: {
    padding: 10,
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  successImage: {
    marginTop: '20%',
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default RatingComment;

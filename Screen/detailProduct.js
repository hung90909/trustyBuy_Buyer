import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import FiveStar from '../compoment/FiveStar';
import ListStar from '../compoment/ListStar';
import moment from 'moment';
import Listproducts from './Listproducts';
import axios from 'axios';
// import 'moment/locale/vi'; // Nếu bạn muốn hiển thị thời gian bằng tiếng Việt
// import 'moment-duration-format';
const DetailProducts = () => {
  const route = useRoute();
  const {productId} = route.params;
  const nav = useNavigation();
  const {item} = route.params;
  const [dataDetail, setDataDetail] = useState([]);
  const [showDec, setShowDec] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likedComment, setLikeComment] = useState([]);
  const [dataComments, setDataComments] = useState([
    {
      id: 1,
      avatarUser:
        'https://th.bing.com/th?q=Anime+Profile%2fAvatar&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.7&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=strict&t=1&mw=247',
      nameUser: 'Nguyễn Văn Hùng',
      textComment: 'Ao rat dao ben, giao hang nhanh gia ca hop ly',
      like: 120,
      star: 4,
      timeComment: '2023-10-31T03:41:46.288Z',
    },
    {
      id: 2,
      avatarUser:
        'https://th.bing.com/th/id/OIP.e7c0V5z2dSlTZ60O2x_M-wHaHa?w=208&h=209&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      nameUser: 'Pham Tien Dung',
      textComment: 'Ao rat dao ben, giao hang nhanh gia ca hop ly',
      like: 130,
      star: 1,
      timeComment: '2023-10-31T03:42:32.216Z',
    },
    {
      id: 3,
      avatarUser:
        'https://th.bing.com/th/id/OIP.aqSg1mTN3zT4TVo2rWuYaQHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      nameUser: 'Pham Tien Dung',
      textComment: 'Ao rat dao ben, giao hang nhanh gia ca hop ly',
      like: 150,
      star: 2,
      timeComment: '2023-10-31T04:57:41.582Z',
    },
    {
      id: 4,
      avatarUser:
        'https://th.bing.com/th/id/OIP.aqSg1mTN3zT4TVo2rWuYaQHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      nameUser: 'Pham Tien Dung',
      textComment: 'Ao rat dao ben, giao hang nhanh gia ca hop ly',
      like: 150,
      star: 2,
      timeComment: '2023-10-31T04:57:41.582Z',
    },
  ]);
  const [sanpham, setSanpham] = useState([
    {
      id: '18',
      nameSP:
        'Áo Polo Teelab Special chất cá sấu thoáng mát co dãn local brand | Miễn phí đổi trả 7 ngày',
      imageSP:
        'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfcatdbaq4qscd',
      priceSP: 346476,
      soldSP: 123456,
      star: 3,
    },
    {
      id: '19',
      nameSP:
        'Quần AOKANG ống rộng thời trang phong cách Nhật Bản tùy chọn màu sắc cho nam',
      imageSP:
        'https://down-vn.img.susercontent.com/file/e37ae5c2e54e2c0749e1c1ee6f8ccea6',
      priceSP: 345332,
      soldSP: 876824345,
    },
    {
      id: '20',
      nameSP:
        'Đồng Hồ Thông Minh SKMEI Ip68 4G Rom + 1G Ram Có Kết Nối Bluetooth 400MAh',
      imageSP:
        'https://down-vn.img.susercontent.com/file/sg-11134201-22120-kzglycl3unlvf4',
      priceSP: 124323,
      soldSP: 456645,
    },
    {
      id: '21',
      nameSP: 'Giày Boot Nam THE WOLF Minimal Chelsea Boot - Tan',
      imageSP:
        'https://down-vn.img.susercontent.com/file/1c6db1d5260f99d6a0a8f55002ba7412',
      priceSP: 234574,
      soldSP: 464356,
    },
    {
      id: '22',
      nameSP:
        'Áo Polo Teelab Special chất cá sấu thoáng mát co dãn local brand | Miễn phí đổi trả 7 ngày',
      imageSP:
        'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfcatdbaq4qscd',
      priceSP: 346476,
      soldSP: 123456,
    },
    {
      id: '23',
      nameSP:
        'Quần AOKANG ống rộng thời trang phong cách Nhật Bản tùy chọn màu sắc cho nam',
      imageSP:
        'https://down-vn.img.susercontent.com/file/e37ae5c2e54e2c0749e1c1ee6f8ccea6',
      priceSP: 345332,
      soldSP: 876824345,
    },
    {
      id: '24',
      nameSP:
        'Đồng Hồ Thông Minh SKMEI Ip68 4G Rom + 1G Ram Có Kết Nối Bluetooth 400MAh',
      imageSP:
        'https://down-vn.img.susercontent.com/file/sg-11134201-22120-kzglycl3unlvf4',
      priceSP: 124323,
      soldSP: 456645,
    },
    {
      id: '25',
      nameSP: 'Giày Boot Nam THE WOLF Minimal Chelsea Boot - Tan',
      imageSP:
        'https://down-vn.img.susercontent.com/file/1c6db1d5260f99d6a0a8f55002ba7412',
      priceSP: 234574,
      soldSP: 464356,
    },
  ]);
  useEffect(() => {
    getDetailProduct();
  }, []);
  const getDetailProduct = async () => {
    try {
      // Tạo đối tượng headers để chứa các thông tin header
      const headers = {
        'x-xclient-id': '654c8a081f10540692bdc998', // Thay 'your-client-id' bằng giá trị thực tế
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjOGEwODFmMTA1NDA2OTJiZGM5OTgiLCJlbWFpbCI6ImR1YzEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRWR1l3dWY4Z0czSnVvR0FSM1hDSXd1UC9iR0lYSzdGbGJRU1RvNXVFZGdYS1ZWUTNpQlVJYSIsImlhdCI6MTcwMDc1NTE0NiwiZXhwIjoxNzAxNjE5MTQ2fQ.zdcI4Ce_Zqc0VgtJpi8V9SuIYG_MfZ5PQ0F77MGnye0', // Thay 'your-access-token' bằng giá trị thực tế
      };
      // Thực hiện GET request đến API endpoint với headers
      const response = await axios.get(
        `API_BASE_URL/v1/api/product/getAllProductByUser/${productId}`,
        {
          headers,
        },
      );
      setData(response.data.message.allProduct);
      console.log(response.data.message.allProduct);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const timeAgo = commentTime => {
    const currentTime = moment();
    const commentDate = moment(commentTime); // Thời gian khi bình luận được tạo

    const timeDifference = moment.duration(currentTime.diff(commentDate));
    moment.updateLocale('vi', {
      relativeTime: {
        s: 'vài giây',
        ss: '%d giây',
        m: '1 phút',
        mm: '%d phút',
        h: '1 giờ',
        hh: '%d giờ',
        d: '1 ngày',
        dd: '%d ngày',
        w: '1 tuần',
        ww: '%d tuần',
        M: '1 tháng',
        MM: '%d tháng',
        y: '1 năm',
        yy: '%d năm',
      },
    });
    const largestUnit = timeDifference.humanize();

    return largestUnit;
  };

  useEffect(() => {
    timeAgo();
  }, []);

  const handleShowDec = () => {
    setShowDec(!showDec);
  };

  const handleLikes = commentID => {
    const commentToLike = dataComments.find(item => item.id === commentID);
    if (commentToLike) {
      const isLike = likedComment.find(item => item === commentID);
      if (!isLike) {
        setLikeComment([...likedComment, commentID]);
        setDataComments(comment =>
          comment.map(item =>
            item.id === commentID ? {...item, like: item.like + 1} : item,
          ),
        );
      } else {
        setLikeComment(likedComment.filter(item => item !== commentID));
        setDataComments(comment =>
          comment.map(item =>
            item.id === commentID ? {...item, like: item.like - 1} : item,
          ),
        );
      }
    }
  };

  const formatPrice = priceSP => {
    return `₫${priceSP.toLocaleString('vi-VN')}`;
  };
  const formatNumber = number => {
    return number.toLocaleString('vi-VN');
  };

  const formatSoldSP = value => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`; // Đơn vị "M" cho giá trị lớn hơn hoặc bằng 1,000,000
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`; // Đơn vị "k" cho giá trị lớn hơn hoặc bằng 1,000
    } else {
      return value.toString(); // Giữ nguyên giá trị nếu nhỏ hơn 1,000
    }
  };

  const firstTwoComments = dataComments.slice(0, 2);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView
        nestedScrollEnabled={true}
        style={{width: '100%', backgroundColor: 'white', marginBottom: 60}}>
        <View style={{height: '100%'}}>
          <TouchableOpacity style={styles.btnBack} onPress={() => nav.goBack()}>
            <Ionicons name="arrow-back-outline" color={'black'} size={30} />
          </TouchableOpacity>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
              height: 400,
              zIndex: -999,
            }}
            source={{uri: item.imageSP}}
          />

          <View style={{padding: 10}}>
            <Text numberOfLines={2} style={styles.nameSP}>
              {item.nameSP}
            </Text>
            <Text style={styles.priceSP}>{formatPrice(item.priceSP)}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <FiveStar numberStar={item.star} width={10} height={10} />
              </View>
              <Text
                style={{
                  marginStart: 10,
                  fontSize: 12,
                }}>
                Đã bán {formatSoldSP(item.soldSP)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              padding: 15,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: 'black',
              }}
              source={{
                uri: 'https://www.elleman.vn/wp-content/uploads/2018/08/08/logo-thuong-hieu-puma-elle-man-1.jpg',
              }}
            />
            <View style={{marginStart: 20, justifyContent: 'center'}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                Puma Việt Nam Official{' '}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="paper-plane-outline" size={13} />
                <Text style={{fontSize: 13, marginStart: 5}}>Hà nội</Text>
              </View>
              <TouchableOpacity
                style={styles.btnShowShop}
                onPress={() => nav.navigate('ShopInformation')}>
                <Text style={{color: 'white', fontSize: 12}}>Xem cửa hàng</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingHorizontal: 10, marginTop: 20}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Chi tiết sản phẩm
            </Text>
            <Text numberOfLines={showDec ? undefined : 4}>
              Quần Jogger thun Dây Rút SUZY Form Rộng Nam Nữ Unisex 🖤 Quần dài
              ống rộng suông TÚI HỘP Y2K phong cách Ulzzang Một chiếc quần thun
              phối màu mới về cực trending cùng chất vải thun cotton có thể mix
              với nhiều dạng áo khác nhau sẽ tạo cho bạn được đa phong cách
              trong phối đồ nè 😇😇. Đảm bảo mẫu này cực phù hợp dành cho bạn
              khi đi học luôn nha, nếu bạn chưa có 1 chiếc quần ống rộng để thay
              đổi style thì thử e này nha • Màu KEM/ĐEN • 3 size M L XL
              (40-50kg). Form unisex nam & nữ mặc đều phù hợp nhé.
            </Text>
            <TouchableOpacity
              style={styles.showDec}
              onPress={() => {
                handleShowDec();
              }}>
              <Text style={{color: 'black'}}>
                {showDec ? 'Thu gọn' : 'Xem thêm'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
              Đánh giá sản phẩm
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <FiveStar numberStar={item.star} width={12} height={12} />
              <Text style={{marginLeft: 5}}>{item.star}5/5</Text>
              <Text style={{marginLeft: 10, fontSize: 11}}>
                ({formatNumber(1000)} đánh giá)
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <ListStar />
            </View>
            <View style={{height: 270}}>
              <FlatList
                data={firstTwoComments}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return (
                    <View style={styles.itemComment}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                            }}
                            source={{uri: item.avatarUser}}
                          />
                          <Text
                            style={{
                              color: 'black',
                              marginLeft: 10,
                              fontWeight: '600',
                            }}>
                            {item.nameUser}
                          </Text>
                        </View>
                        <View style={styles.cssStar}>
                          <Text style={{color: 'black', marginRight: 2}}>
                            {item.star}
                          </Text>
                          <Ionicons name="star" color={'orange'} />
                        </View>
                      </View>
                      <Text style={{color: 'black', marginTop: 6}}>
                        {item.textComment}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 6}}>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() => handleLikes(item.id)}>
                            {likedComment.includes(item.id) ? (
                              <Ionicons name="heart" color={'red'} size={20} />
                            ) : (
                              <Ionicons
                                name="heart-outline"
                                color={'red'}
                                size={20}
                              />
                            )}
                          </TouchableOpacity>
                          <Text style={{color: 'black', marginLeft: 3}}>
                            {item.like}
                          </Text>
                        </View>
                        <Text style={{marginLeft: 25}}>
                          {timeAgo(item.timeComment)} trước
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <TouchableOpacity style={styles.btnShowAllComment}>
              <Text style={{color: 'black'}}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.relaiedProduct}>
            <Text style={styles.textRelaiedProduct}>
              Gợi ý sản phẩm liên quan
            </Text>
            <Listproducts />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnAddCart}>
          <Ionicons name="cart-outline" size={30} color={'black'} />
          <Text style={{color: 'black'}}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBuyNow}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnBuyNow: {
    width: '50%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddCart: {
    width: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  btnBack: {
    position: 'absolute',
    marginTop: 20,
    zIndex: 999,
    marginLeft: 20,
  },
  textRelaiedProduct: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  relaiedProduct: {
    minHeight: 600,
    alignItems: 'center',
  },
  btnShowAllComment: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderTopWidth: 1,
    borderColor: 'rgba(217, 217, 217, 1)',
  },
  cssStar: {
    height: 30,
    width: 60,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
  },
  itemComment: {
    minHeight: 120,
    marginTop: 10,
    paddingVertical: 10,
  },
  btnAll: {
    height: 30,
    width: 60,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  showDec: {
    width: '100%',
    borderColor: 'rgba(217, 217, 217, 1)',
    borderTopWidth: 1,
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  btnShowShop: {
    width: 110,
    height: 27,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 6,
  },
  priceSP: {
    color: '#FC6D26',
    fontSize: 18,
    marginVertical: 10,
  },
  nameSP: {
    color: 'black',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  product: {
    height: '80%',
    backgroundColor: 'white',
    width: '100%',
  },
});

export default DetailProducts;

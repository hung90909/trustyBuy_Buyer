import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import SlideShow from '../../compoment/sildeShow';
import Swiper from 'react-native-swiper';

const Welcome1 = () => {
  const data = [
    {
      image:
        'https://th.bing.com/th/id/OIP.mIJ22yp-GYpTdZSONq_bLgHaLH?pid=ImgDet&w=204&h=306&c=7&dpr=1.7',
      text: 'Chúng tôi cung cấp các sản phẩm chất lượng cho bạn',
    },
    {
      image:
        'https://th.bing.com/th/id/OIP.i2enHpvw3tkVL9sCrg2gCwHaJA?pid=ImgDet&w=183&h=222&c=7&dpr=1.7',
      text: 'Chúng tôi cung cấp các sản phẩm chất lượng cho bạn',
    },
    {
      image:
        'https://th.bing.com/th/id/OIP.mJw6N4vR4tmf0iTZNIzdtwAAAA?pid=ImgDet&w=183&h=240&c=7&dpr=1.7',
      text: 'Chúng tôi cung cấp các sản phẩm chất lượng cho bạn',
    },
  ];
  const nav = useNavigation();

  const swiperRef = useRef(null);
  const nextSilde = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const onIndexChanged = index => {
    if (index === data.length) {
      // Nếu đang ở slide cuối cùng, chuyển sang màn hình mới
      nav.navigate('Login'); // Thay 'NewScreen' bằng tên màn hình mới của bạn
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '90%',
        }}>
        <Swiper
          loop={false}
          ref={swiperRef}
          onIndexChanged={onIndexChanged}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#000',
                width: 20,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }>
          {data.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={{uri: item.image}}
              />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </Swiper>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            nextSilde();
          }}
          style={styles.btnNext}>
          <Text style={{color: 'white'}}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: '80%',
    width: '100%',
  },
  body: {
    padding: 20,
  },
  text: {
    color: 'black',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnNext: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    borderRadius: 20,
  },
});
export default Welcome1;

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
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

  const swiperConfig = {
    loop: false,
    dot: <View style={styles.dot} />,
    activeDot: <View style={styles.activeDot} />,
  };

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const onIndexChanged = index => {
    if (index === data.length) {
<<<<<<< HEAD
      nav.navigate('Login');
=======
      // Nếu đang ở slide cuối cùng, chuyển sang màn hình mới
      nav.navigate('Login2'); // Thay 'NewScreen' bằng tên màn hình mới của bạn
>>>>>>> ed223e8d1275c73230897764a6d5e622f4050a6e
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          onIndexChanged={onIndexChanged}
          {...swiperConfig}>
          {data.map((item, index) => (
            <Slide key={index} imageUri={item.image} text={item.text} />
          ))}
        </Swiper>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={nextSlide} style={styles.btnNext}>
          <Text style={styles.btnText}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Slide = ({imageUri, text}) => (
  <View style={styles.slide}>
    <Image resizeMode="stretch" style={styles.image} source={{uri: imageUri}} />
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    height: '90%',
  },
  slide: {
    flex: 1,
  },
  image: {
    height: '80%',
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 20,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  btnContainer: {
    paddingHorizontal: 20,
  },
  btnNext: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
  },
});

export default Welcome1;

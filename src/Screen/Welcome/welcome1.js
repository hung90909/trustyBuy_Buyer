import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const Welcome1 = () => {
  const data = [
    {
      image:
        'https://cafefcdn.com/203337114487263232/2022/1/25/1-1643080654946580357162.jpg',
      text: 'Chúng tôi cung cấp các sản phẩm chất lượng cho bạn',
    },
    {
      image:
        'https://media.vneconomy.vn/w900/images/upload/2022/02/11/z3171115711773-550e04205cbdd6b8fd675e9f250a6c68.jpg',
      text: 'Chúng tôi cung cấp các sản phẩm chất lượng cho bạn',
    },
    {
      image:
        'https://mcdn.coolmate.me/image/August2021/thuong-hieu-thoi-trang-nam-tam-trung_99.jpg',
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
      nav.navigate('Login2');
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
    resizeMode: 'contain',
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

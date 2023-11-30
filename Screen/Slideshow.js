import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
const Slideshow = () => {
  return (
    <View
      style={{
        height: 160,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20,
        overflow: 'hidden',
      }}>
      <Swiper autoplay={true} autoplayTimeout={3}>
        <View style={{flex: 1}}>
          <Image
            style={styles.slideshow}
            resizeMode="stretch"
            source={{
              uri: 'https://intphcm.com/data/upload/banner-thoi-trang-nam.jpg',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Image
            style={styles.slideshow}
            resizeMode="stretch"
            source={{
              uri: 'https://intphcm.com/data/upload/banner-thoi-trang-nam-dep.jpg',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Image
            style={styles.slideshow}
            resizeMode="stretch"
            source={{
              uri: 'https://tmluxury.vn/wp-content/uploads/ao-so-mi-nam-dep-tm-luxury.jpg',
            }}
          />
        </View>
      </Swiper>
    </View>
  );
};

export default Slideshow;

const styles = StyleSheet.create({
  slideshow: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

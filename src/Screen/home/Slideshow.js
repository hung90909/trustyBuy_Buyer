import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

const Slideshow = () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={true} autoplayTimeout={3}>
        <View>
          <Image
            style={styles.slide}
            resizeMode="stretch"
            source={{
              uri: 'https://intphcm.com/data/upload/banner-thoi-trang-nam.jpg',
            }}
          />
        </View>
        <View>
          <Image
            style={styles.slide}
            resizeMode="stretch"
            source={{
              uri: 'https://intphcm.com/data/upload/banner-thoi-trang-nam-dep.jpg',
            }}
          />
        </View>
        <View>
          <Image
            style={styles.slide}
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

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  slide: {
    width: '100%',
    height: '100%',
  },
});

export default Slideshow;

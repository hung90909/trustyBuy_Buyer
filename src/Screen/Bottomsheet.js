import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';

const Bottomsheet = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{justifyContent: 'center', alignSelf: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Tùy chọn tìm kiếm
          </Text>
        </View>
        <View>
          <View>
            <Text style={styles.textSheet}>Sắp xếp</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10,
              }}>
              <Pressable style={styles.butonSheetl}>
                <Text style={styles.textButonShet}>Bán chạy</Text>
              </Pressable>
              <Pressable style={styles.butonSheetl}>
                <Text style={styles.textButonShet}>Giá cao thấp</Text>
              </Pressable>
              <Pressable style={styles.butonSheetl}>
                <Text style={styles.textButonShet}>Giá thấp cao</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={styles.textSheet}>Khoảng giá</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10,
              }}>
              <TextInput
                style={styles.edtGia}
                placeholder="TỐI THIỂU"
                keyboardType="numeric"
              />
              <View
                style={{
                  height: 0.5,
                  backgroundColor: 'black',
                  width: 20,
                  alignSelf: 'center',
                }}></View>
              <TextInput
                style={styles.edtGia}
                placeholder="TỐI ĐA"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.textSheet}>Đánh giá</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Pressable style={styles.butonSheetl}>
              <Text style={styles.textButonShet}>5 sao</Text>
            </Pressable>
            <Pressable style={styles.butonSheetl}>
              <Text style={styles.textButonShet}>4 sao</Text>
            </Pressable>
            <Pressable style={styles.butonSheetl}>
              <Text style={styles.textButonShet}>3 sao</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 20,
            }}>
            <Pressable style={styles.butonSheetl}>
              <Text style={styles.textButonShet}>2 sao</Text>
            </Pressable>
            <Pressable style={styles.butonSheetl}>
              <Text style={styles.textButonShet}>1 sao</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <Pressable style={styles.butonSheetl}>
          <Text style={styles.textButonShet}>Thiết lập lại</Text>
        </Pressable>
        <Pressable style={styles.butonSheetl1}>
          <Text style={styles.textButonShet1}>Áp dụng</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Bottomsheet;

const styles = StyleSheet.create({
  butonSheetl: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSheet: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textButonShet: {
    color: 'black',
    fontWeight: 'bold',
  },
  edtGia: {
    borderWidth: 1,
    width: 150,
    height: 40,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
  },
  butonSheetl1: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textButonShet1: {
    fontWeight: 'bold',
    color: 'white',
  },
});

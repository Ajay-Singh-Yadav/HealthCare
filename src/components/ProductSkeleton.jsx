import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const ProductSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textPlaceholder} />
      <View style={styles.textSmallPlaceholder} />
    </View>
  );
};

export default ProductSkeleton;

const styles = StyleSheet.create({
  card: {
    height: verticalScale(220),
    width: scale(160),
    backgroundColor: '#eee',
    margin: moderateScale(8),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  imagePlaceholder: {
    height: verticalScale(120),
    backgroundColor: '#ddd',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  textPlaceholder: {
    height: verticalScale(15),
    backgroundColor: '#ddd',
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(5),
  },
  textSmallPlaceholder: {
    height: verticalScale(12),
    width: '60%',
    backgroundColor: '#ddd',
    borderRadius: moderateScale(5),
  },
});

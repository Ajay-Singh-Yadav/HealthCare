import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductSkeleton = ({ variant = 'grid' }) => {
  if (variant === 'horizontal') {
    // 👉 For horizontal list (HomeScreen sections)
    return (
      <SkeletonPlaceholder borderRadius={8}>
        <View style={styles.horizontalCard}>
          <View style={styles.horizontalImage} />
          <View style={styles.horizontalText} />
          <View style={styles.horizontalTextSmall} />
        </View>
      </SkeletonPlaceholder>
    );
  }

  // 👉 Default = grid (ProductScreen, 2 columns)
  return (
    <SkeletonPlaceholder borderRadius={10}>
      <View style={styles.gridCard}>
        <View style={styles.gridImage} />
        <View style={styles.gridText} />
        <View style={styles.gridTextSmall} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default ProductSkeleton;

const styles = StyleSheet.create({
  // 🔹 Grid style (ProductScreen, 2 columns)
  gridCard: {
    height: verticalScale(220),
    width: scale(160),
    margin: moderateScale(8),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  gridImage: {
    height: verticalScale(120),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  gridText: {
    height: verticalScale(15),
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(5),
  },
  gridTextSmall: {
    height: verticalScale(12),
    width: '60%',
    borderRadius: moderateScale(5),
  },

  // 🔹 Horizontal style (HomeScreen horizontal list)
  horizontalCard: {
    width: scale(140),
    height: verticalScale(180),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(8),
    padding: moderateScale(8),
  },
  horizontalImage: {
    height: verticalScale(100),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(8),
  },
  horizontalText: {
    height: verticalScale(14),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(4),
  },
  horizontalTextSmall: {
    height: verticalScale(12),
    width: '70%',
    borderRadius: moderateScale(4),
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { moderateScale } from 'react-native-size-matters';

export const Banners = ({ shopNowBanner }) => {
  return (
    <TouchableOpacity style={styles.shopNowBannerContainer}>
      <FastImage
        source={shopNowBanner}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 200,
        }}
      />
    </TouchableOpacity>
  );
};

export default React.memo(Banners);

const styles = StyleSheet.create({
  shopNowBannerContainer: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    elevation: 5,
  },
  shopNowBanner: {
    width: '100%',
    height: 200,
  },
});

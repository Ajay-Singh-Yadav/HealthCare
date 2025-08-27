import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale } from 'react-native-size-matters';

const userProfile = require('../../assets/images/user.png');
const splashlogo = require('../../assets/images/splashlogo.png');

const Header = () => {
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity activeOpacity={0.6}>
        <Image source={userProfile} style={styles.profileLogo} />
      </TouchableOpacity>
      <Image source={splashlogo} style={styles.logoImage} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  logoImage: {
    width: 150,
    height: 65,
    resizeMode: 'contain',
    marginLeft: scale(65),
  },
  profileLogo: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
});

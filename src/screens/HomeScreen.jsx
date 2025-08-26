import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SearchBar from '../components/SearchBar';
import AllFeatured from './HomeComponents/AllFeatured';
import Categories from './HomeComponents/Categories';
import FastImage from 'react-native-fast-image';
import Banners from './HomeComponents/Banners';

const shopNowBanner = require('../assets/images/BannerImage.png');

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity>
          <Entypo name="menu" size={moderateScale(30)} color="#323232" />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/splashlogo.png')}
          style={styles.logoImage}
        />

        <TouchableOpacity activeOpacity={0.6}>
          <Image
            source={require('../assets/images/profilelogo.png')}
            style={styles.profileLogo}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <SearchBar />

      {/* All Featured */}
      <AllFeatured />

      {/* Categories + Banner */}
      <View>
        {/* Categories */}
        <Categories />

        {/* Banner just below Categories */}
        <Banners shopNowBanner={shopNowBanner} />

        {/* Deals of the Day */}
        <View style={styles.DealsoftheDayContainer}>
          <View>
            <Text style={styles.DealsoftheDayText}>Deals of the Day</Text>
            <View style={styles.DealRemainingContainer}>
              <Ionicons
                name="alarm-outline"
                size={moderateScale(20)}
                color="#fff"
                style={styles.clockIcon}
              />
              <Text style={styles.DealRemainingText}>
                22h 55m 20s remaining{' '}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.ViewAllContainer}>
            <Text style={styles.ViewAllText}>View All</Text>
            <Entypo
              name="chevron-right"
              size={moderateScale(25)}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products */}
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  logoImage: {
    width: 150,
    height: 65,
    resizeMode: 'contain',
  },
  profileLogo: {
    width: moderateScale(55),
    height: moderateScale(55),
    resizeMode: 'contain',
  },
  DealsoftheDayContainer: {
    flexDirection: 'row',
    backgroundColor: '#4392F9',
    height: verticalScale(70),
    width: scale(333),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(10),
    marginTop: verticalScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },

  DealsoftheDayText: {
    fontSize: moderateScale(16),
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    marginTop: verticalScale(5),
    marginLeft: moderateScale(10),
  },
  DealRemainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DealRemainingText: {
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    marginTop: verticalScale(5),
    marginLeft: moderateScale(5),
  },
  clockIcon: {
    marginLeft: moderateScale(10),
  },
  ViewAllContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    width: moderateScale(110),
    height: moderateScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
  },
  ViewAllText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-SemiBold',
  },
});

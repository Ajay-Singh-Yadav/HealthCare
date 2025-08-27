import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useQuery } from '@apollo/client';

import SearchBar from '../components/SearchBar';
import AllFeatured from './HomeComponents/AllFeatured';
import Categories from './HomeComponents/Categories';
import Banners from './HomeComponents/Banners';
import ProductCard from './HomeComponents/ProducCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { GET_PRODUCTS } from '../graphql/queries/categories';
import DealTrandingCard from './HomeComponents/DealTrandingCard';
import Productlist from './HomeComponents/Productlist';

const shopNowBanner = require('../assets/images/BannerImage.png');
const shopNowBanner2 = require('../assets/images/BannerImage2.png');
const userProfile = require('../assets/images/user.png');
const splashlogo = require('../assets/images/splashlogo.png');

const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-first',
  });
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.HeaderContainer}>
        <TouchableOpacity activeOpacity={0.6}>
          <Image source={userProfile} style={styles.profileLogo} />
        </TouchableOpacity>
        <Image source={splashlogo} style={styles.logoImage} />
      </View>

      {/* Search Bar */}
      <SearchBar />

      <ScrollView>
        {/* Featured */}
        <AllFeatured />

        {/* Categories */}
        <Categories />

        {/* Banner */}
        <Banners shopNowBanner={shopNowBanner} />

        {/* Deals of the Day */}

        <DealTrandingCard bgColor={'#4392F9'} />

        <Productlist
          loading={loading}
          error={error}
          data={data}
          showSkeleton={showSkeleton}
        />

        <Banners shopNowBanner={shopNowBanner2} />

        <DealTrandingCard bgColor={'#FD6E87'} />

        <Productlist
          loading={loading}
          error={error}
          data={data}
          showSkeleton={showSkeleton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  DealRemainingContainer: { flexDirection: 'row', alignItems: 'center' },
  DealRemainingText: {
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    marginTop: verticalScale(5),
    marginLeft: moderateScale(5),
  },
  clockIcon: { marginLeft: moderateScale(10) },
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
  skeletonWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

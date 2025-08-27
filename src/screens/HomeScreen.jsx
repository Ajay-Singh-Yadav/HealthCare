import React, { useEffect, useState } from 'react';
import {
  View,
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

import { GET_PRODUCTS } from '../graphql/queries/categories';
import DealTrandingCard from './HomeComponents/DealTrandingCard';
import Productlist from './HomeComponents/Productlist';
import Header from './HomeComponents/Header';

const shopNowBanner = require('../assets/images/BannerImage.png');
const shopNowBanner2 = require('../assets/images/BannerImage2.png');

const HomeScreen = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { category: null, search: null },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    refetch({ category, search: searchText || null });
  };

  const handleSearch = text => {
    setSearchText(text);
    refetch({ category: selectedCategory, search: text || null });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      <ScrollView>
        {/* Featured */}

        {/* Categories */}
        <Categories onCategorySelect={handleCategorySelect} />

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

  skeletonWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

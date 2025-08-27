import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries/categories';
import ProductCard from '../screens/HomeComponents/ProducCard';
import Header from './HomeComponents/Header';
import SearchBar from '../components/SearchBar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllFeatured from './HomeComponents/AllFeatured';
import ProductSkeleton from '../components/ProductSkeleton';

const ProductScreen = () => {
  const route = useRoute();
  const { category } = route.params; // 👈 category from navigation

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category, search: null },
  });

  if (error) return <Text>Error loading products</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <SearchBar onSearch={() => {}} />
      <AllFeatured />
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          numColumns={2}
          keyExtractor={item => item.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={() => <ProductSkeleton variant="horizontal" />}
        />
      ) : (
        <FlatList
          data={data?.products || []}
          numColumns={2}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: verticalScale(10),
  },
  skeletonCard: {
    width: scale(140),
    height: verticalScale(200),
    marginRight: moderateScale(12),
  },
});

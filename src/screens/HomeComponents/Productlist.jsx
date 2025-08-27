import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProductCard from './ProducCard';
import ProductSkeleton from '../../components/ProductSkeleton';

const Productlist = ({ loading, error, data, showSkeleton = false }) => {
  return (
    <View>
      {error ? (
        <Text>Error loading products</Text>
      ) : loading || showSkeleton ? (
        // Skeleton grid (sirf yahan)
        <View style={styles.skeletonWrapper}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </View>
      ) : (
        // Real products
        <FlatList
          data={data?.products.slice(0, 10) || []}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      )}
    </View>
  );
};

export default React.memo(Productlist);

const styles = StyleSheet.create({});

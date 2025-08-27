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
        <View style={styles.skeletonWrapper}>
          {loading && (
            <FlatList
              data={[1, 2, 3, 4, 5]}
              horizontal
              keyExtractor={item => item.toString()}
              renderItem={() => <ProductSkeleton variant="horizontal" />}
            />
          )}
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

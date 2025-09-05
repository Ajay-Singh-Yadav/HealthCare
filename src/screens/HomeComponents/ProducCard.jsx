import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  const navigateToDetail = () => {
    navigation.navigate('ProductDetailScreen', { product });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.card}
      onPress={navigateToDetail}
    >
      <FastImage source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.rating}>⭐ {product.rating}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: scale(150),
    height: verticalScale(220),
    margin: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: '#fff',
    elevation: 3,
    padding: moderateScale(5),
  },
  image: {
    width: '100%',
    height: verticalScale(120),
    borderRadius: moderateScale(10),
  },
  title: { fontSize: moderateScale(12), fontWeight: '600', marginTop: 4 },
  price: { fontSize: moderateScale(12), fontWeight: '700', marginTop: 2 },
  rating: { fontSize: moderateScale(10), color: '#888', marginTop: 2 },
});

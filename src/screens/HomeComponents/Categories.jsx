import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import { CategoriesList } from '../../constants/CategoriesList';
import { useNavigation } from '@react-navigation/native';

const categoryMap = {
  Mens: "men's clothing",
  Womens: "women's clothing",
  Electronics: 'electronics',
  Jewelery: 'jewelery',
};

const Categories = ({ onCategorySelect }) => {
  const navigation = useNavigation();

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSkeleton) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5]}
        horizontal
        keyExtractor={item => item.toString()}
        contentContainerStyle={{ padding: 10 }}
        showsHorizontalScrollIndicator={false}
        renderItem={() => (
          <SkeletonPlaceholder borderRadius={10}>
            <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
              <View
                style={{
                  width: moderateScale(55),
                  height: moderateScale(55),
                  borderRadius: moderateScale(35),
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: moderateScale(40),
                  height: 10,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        )}
      />
    );
  }

  return (
    <FlatList
      data={CategoriesList}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductScreen', { category: item.actualName })
          }
        >
          <View style={styles.imageWrapper}>
            <FastImage source={item.image} style={styles.image} />
          </View>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default React.memo(Categories);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    height: verticalScale(60),
    width: scale(63),
    marginHorizontal: 5,
  },
  imageWrapper: {
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: moderateScale(35),
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: moderateScale(10),
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    textAlign: 'center',
  },
});

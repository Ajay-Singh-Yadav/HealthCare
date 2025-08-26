import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AllFeatured = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {},
        featuredContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: moderateScale(20),
          marginHorizontal: moderateScale(18),
        },
        featuredText: {
          color: 'black',
          fontFamily: 'Montserrat-SemiBold',
          fontSize: moderateScale(18),
        },
        SortFilterContainer: {
          flexDirection: 'row',
        },
        SortFilterButton: {
          backgroundColor: '#fff',
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(3),
          borderRadius: moderateScale(5),
          marginLeft: moderateScale(8),
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
        },
        SortFilterText: {
          fontFamily: 'Montserrat-Regular',
          fontSize: moderateScale(12),
        },
      }),
    [],
  );

  return (
    <View style={styles.container}>
      {/* Featured Conatiner */}
      <View style={styles.featuredContainer}>
        <Text style={styles.featuredText}>All Featured</Text>
        <View style={styles.SortFilterContainer}>
          {/* Sort Button */}
          <TouchableOpacity activeOpacity={0.5} style={styles.SortFilterButton}>
            <Text style={styles.SortFilterText}>Sort</Text>
            <MaterialCommunityIcons
              name="arrow-up-down"
              size={moderateScale(16)}
              color="black"
            />
          </TouchableOpacity>
          {/* Filter Button */}
          <TouchableOpacity activeOpacity={0.5} style={styles.SortFilterButton}>
            <Text style={styles.SortFilterText}>Filter</Text>
            <Feather name="filter" size={moderateScale(16)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(AllFeatured);

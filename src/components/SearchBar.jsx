import { StyleSheet, TextInput, View } from 'react-native';
import React, { useMemo } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: scale(330),
          height: verticalScale(40),
          marginHorizontal: scale(8),

          borderRadius: scale(6),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(10),
          justifyContent: 'space-between',
          backgroundColor: 'white',
          elevation: 5,
          marginBottom: verticalScale(5),
        },
        innerContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        input: {
          color: 'black',
          width: scale(250),
          marginLeft: scale(5),
          fontSize: scale(12),
        },
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Ionicons name="search" size={scale(20)} color="#BBBBBB" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#BBBBBB'}
          style={styles.input}
        />
      </View>
      <Ionicons name="mic-outline" size={moderateScale(24)} color="#BBBBBB" />
    </View>
  );
};

export default React.memo(SearchBar);

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommonBackHeader = ({ Header }) => {
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity>
        <Ionicons name="arrow-back" size={moderateScale(22)} color="black" />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{Header}</Text>
    </View>
  );
};

export default React.memo(CommonBackHeader);

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    width: '100%',
    height: moderateScale(40),
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  HeaderText: {
    fontSize: moderateScale(14),
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    marginLeft: moderateScale(10),
  },
});

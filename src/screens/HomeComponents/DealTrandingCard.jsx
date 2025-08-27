import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DealTrandingCard = ({ bgColor, onPress }) => {
  return (
    <View style={[styles.DealsoftheDayContainer, { backgroundColor: bgColor }]}>
      <View>
        <Text style={styles.DealsoftheDayText}>Deals of the Day</Text>
        <View style={styles.DealRemainingContainer}>
          <Ionicons
            name="alarm-outline"
            size={moderateScale(20)}
            color="#fff"
            style={styles.clockIcon}
          />
          <Text style={styles.DealRemainingText}>22h 55m 20s remaining</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.ViewAllContainer}>
        <Text style={styles.ViewAllText}>View All</Text>
        <Entypo name="chevron-right" size={moderateScale(25)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(DealTrandingCard);

const styles = StyleSheet.create({
  DealsoftheDayContainer: {
    flexDirection: 'row',
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
});

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Entypo from 'react-native-vector-icons/Entypo';
import { moderateScale } from 'react-native-size-matters';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity>
          <Entypo name="menu" size={moderateScale(30)} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/splashlogo.png')}
          style={styles.logoImage}
        />

        <TouchableOpacity activeOpacity={0.6}>
          <Image
            source={require('../assets/images/profilelogo.png')}
            style={styles.profileLogo}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  logoImage: {
    width: 150,
    height: 65,
    resizeMode: 'contain',
  },
  profileLogo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

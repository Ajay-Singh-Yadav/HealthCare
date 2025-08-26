import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const BannerScreen = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: '#000',
        },
        bannerImage: {
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'flex-end',
        },
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        textContainer: {
          paddingBottom: verticalScale(30),
          alignItems: 'center',
        },
        bannerText: {
          fontSize: moderateScale(34),
          color: '#fff',
          fontFamily: 'Montserrat-SemiBold',
          textAlign: 'center',
          marginBottom: verticalScale(8),
        },
        bannerText2: {
          fontSize: moderateScale(14),
          marginBottom: verticalScale(16),
          color: '#fff',
          fontFamily: 'Montserrat-Regular',
          textAlign: 'center',
        },
        StartedButton: {
          height: verticalScale(42),
          width: '80%',
          backgroundColor: '#F83758',
          paddingHorizontal: moderateScale(12),
          borderRadius: moderateScale(10),
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: verticalScale(16),
        },
        StartedButtonText: {
          color: '#fff',
          fontSize: moderateScale(18),
          fontFamily: 'Montserrat-SemiBold',
        },
      }),
    [],
  );

  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ImageBackground
        source={require('../assets/images/Banner.png')}
        style={styles.bannerImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.textContainer} edges={['bottom']}>
          <Text style={styles.bannerText}>
            You want{'\n'} Authentic, here{'\n'} you go!
          </Text>
          <Text style={styles.bannerText2}>Find it here, buy it now!</Text>
          <TouchableOpacity
            onPress={() => navigation.replace('MainTabs')}
            activeOpacity={0.8}
            style={styles.StartedButton}
          >
            <Text style={styles.StartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default React.memo(BannerScreen);

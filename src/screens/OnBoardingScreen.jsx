import React, { useMemo, useContext } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import FastImage from 'react-native-fast-image';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthContext';

const backgroundColors = ['#fce0df', '#fff6d0', '#ffdbf4'];
const imageSize = moderateScale(300);
const TITLE_FONT_SIZE = moderateScale(24);
const SUBTITLE_FONT_SIZE = moderateScale(14);
const SUBTITLE_LINE_HEIGHT = verticalScale(20);

const onboardingData = [
  {
    image: require('../assets/images/OnBoarding1.png'),
    title: 'Choose Products',
    subtitle:
      'Browse through a wide range of products tailored to your needs. Pick your favorites with just a tap!',
  },
  {
    image: require('../assets/images/OnBoarding2.png'),
    title: 'Make Payment',
    subtitle:
      'Enjoy a smooth and secure checkout experience with multiple payment options at your fingertips.',
  },
  {
    image: require('../assets/images/OnBoarding3.png'),
    title: 'Get Your Order',
    subtitle:
      'Sit back and relax while we deliver your order quickly and safely, right to your doorstep.',
  },
];

const OnBoardingScreen = ({ onDone }) => {
  const navigation = useNavigation();
  const { isAuthenticated } = useContext(AuthContext);

  const pages = useMemo(
    () =>
      onboardingData.map((item, index) => ({
        backgroundColor: backgroundColors[index],
        image: (
          <FastImage
            source={item.image}
            style={styles.imageStyle}
            resizeMode={FastImage.resizeMode.contain}
          />
        ),
        title: item.title,
        titleStyles: styles.title,
        subtitle: item.subtitle,
        subTitleStyles: styles.subtitle,
      })),
    [],
  );

  if (isAuthenticated) {
    navigation.replace('HomeScreen');
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Onboarding
        controlStatusBar={false}
        pages={pages}
        onDone={onDone}
        onSkip={onDone}
      />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageStyle: { width: imageSize, height: imageSize },
  title: {
    fontSize: TITLE_FONT_SIZE,
    fontFamily: 'Montserrat-ExtraBold',
    color: 'black',
  },
  subtitle: {
    fontSize: SUBTITLE_FONT_SIZE,
    fontFamily: 'Montserrat-SemiBold',
    color: '#A8A8A9',
    textAlign: 'center',
    lineHeight: SUBTITLE_LINE_HEIGHT,
    paddingHorizontal: moderateScale(15),
  },
});

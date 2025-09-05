import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import FastImage from 'react-native-fast-image';
import { moderateScale } from 'react-native-size-matters';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const animationTime = 2000;

const SplashScreen = () => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: animationTime,
      easing: Easing.linear,
    });
    scale.value = withTiming(1, {
      duration: animationTime,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* <Animated.View style={animatedStyle}>
        <FastImage
          source={require('../assets/images/splashlogo.png')}
          style={styles.logo}
        />
      </Animated.View> */}

      <View style={styles.container}>
        <LottieView
          source={require('../assets/Water_Animation.json')}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>
    </View>
  );
};

export default React.memo(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: moderateScale(180),
    aspectRatio: 300 / 110,
    resizeMode: FastImage.resizeMode.contain,
  },
});

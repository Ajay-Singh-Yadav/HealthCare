import React, { memo, useEffect, useRef } from 'react';
import { Animated, View, Image, InteractionManager, Text } from 'react-native';
import useSplash from '../hooks/useSplash';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
// import getAuth from '@react-native-firebase/auth';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

const SplashScreen = () => {
  const navigation = useNavigation();
  const styles = useSplash();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    const chechUser = () => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace('Home');
        } else {
          navigation.replace('LogIn');
        }
      });
      return unsubscribe;
    };

    const timeout = setTimeout(chechUser, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [navigation]);

  useEffect(() => {
    lottieRef.current?.play();

    return () => {
      lottieRef.current?.reset();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LottieView
        ref={lottieRef}
        source={require('../assets/animations/Fintech.json')}
        autoPlay
        loop={true}
        style={styles.lottie}
      />
    </Animated.View>
  );
};

export default memo(SplashScreen);

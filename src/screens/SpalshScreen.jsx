import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/images/welcome.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default React.memo(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Match your theme/splash bg
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
});

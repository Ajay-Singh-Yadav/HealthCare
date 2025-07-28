// components/ScreenWrapper.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children, style, edges = ['top', 'bottom'] }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={edges}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Optional: Set default background
  },
  inner: {
    flex: 1,
  },
});

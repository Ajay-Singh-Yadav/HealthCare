import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ fontSize: 20, color: 'black' }}>Setting Screen</Text>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ fontSize: 20, color: 'black' }}>Cart Screen</Text>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';

import { StatusBar, View } from 'react-native';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      {/* <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
      </Stack.Navigator>
    </>
  );
};

export default React.memo(MainStack);

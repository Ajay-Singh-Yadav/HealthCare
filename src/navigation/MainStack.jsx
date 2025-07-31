import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import TransactionDetailsScreen from '../screens/TransactionDetailsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Add" component={AddTransactionScreen} />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

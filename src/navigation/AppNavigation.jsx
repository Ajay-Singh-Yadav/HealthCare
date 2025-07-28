import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SpalshScreen';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { AuthContext } from './AuthContext';

const AppNavigation = () => {
  const [isLoading, setloading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const time = setTimeout(() => {
      setloading(false);
    }, 3000);

    return () => clearTimeout(time);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#111827"
      />
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;

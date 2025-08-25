import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import BannerScreen from '../screens/BannerScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [showBanner, setShowBanner] = useState(null);

  useEffect(() => {
    const checkBanner = async () => {
      try {
        const bannerShown = await AsyncStorage.getItem('bannerShown');
        if (!bannerShown) {
          setShowBanner(true);
          await AsyncStorage.setItem('bannerShown', 'true');
        } else {
          setShowBanner(false);
        }
      } catch (e) {
        console.log('Error checking banner:', error);
        setShowBanner(false);
      }
    };

    checkBanner();
  }, []);

  if (showBanner === null) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showBanner && <Stack.Screen name="Banner" component={BannerScreen} />}
      <Stack.Screen name="MainTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;

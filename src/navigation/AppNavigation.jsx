import React, { useContext, useEffect, useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SpalshScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../constants/ThemeContext';
import { StatusBar } from 'react-native';

const MIN_SPLASH_TIME = 2000;

const AppNavigation = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    let timeoutId;

    const checkFirstLaunch = async () => {
      const startTime = Date.now();
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          setShowOnboarding(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        }
      } catch (error) {
        console.log('Error checking first launch:', error);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = MIN_SPLASH_TIME - elapsed;
        timeoutId = setTimeout(
          () => setIsLoading(false),
          remaining > 0 ? remaining : 0,
        );
      }
    };

    checkFirstLaunch();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleOnboardingDone = () => setShowOnboarding(false);

  const renderContent = useMemo(() => {
    if (isLoading) return <SplashScreen />;
    if (showOnboarding)
      return <OnBoardingScreen onDone={handleOnboardingDone} />;
    return isAuthenticated ? <MainStack /> : <AuthStack />;
  }, [isLoading, showOnboarding, isAuthenticated]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      {renderContent}
    </NavigationContainer>
  );
};

export default React.memo(AppNavigation);

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';

import { useTheme } from '../constants/ThemeContext';
import CartScreen from '../screens/CartScreen';
import { StyleSheet, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SearchScreen from '../screens/SearchScreen';
import SettingScreen from '../screens/SettingScreen';
import WishlistScreen from '../screens/WishlistScreen';

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  const { theme } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Wishlist') {
            return (
              <Entypo
                name={focused ? 'heart' : 'heart-outlined'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Cart') {
            return (
              <View style={styles.cart}>
                <MaterialCommunityIcons
                  name={focused ? 'cart' : 'cart-outline'}
                  size={size}
                  color={color}
                />
              </View>
            );
          } else if (route.name === 'Search') {
            return <Ionicons name="search-outline" size={size} color={color} />;
          } else if (route.name === 'Setting') {
            return (
              <Ionicons
                name={focused ? 'settings-sharp' : 'settings-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingBottom: moderateScale(5),
          paddingTop: moderateScale(5),
          borderTopWidth: 0,
          elevation: 10,
          height: verticalScale(50),
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#EB3030',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Wishlist" component={WishlistScreen} />
      <Tabs.Screen
        options={{ tabBarLabel: () => null }}
        name="Cart"
        component={CartScreen}
      />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Setting" component={SettingScreen} />
    </Tabs.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  cart: {
    backgroundColor: '#fff',
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(4),
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { moderateScale, verticalScale } from 'react-native-size-matters';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import DocumentScreen from '../screens/DocumentScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = (
                <Entypo
                  name="home"
                  size={moderateScale(24)}
                  color={focused ? '#1ABC9C' : '#333'}
                />
              );
              break;

            case 'Calendar':
              icon = (
                <MaterialIcons
                  name="calendar-today"
                  size={moderateScale(24)}
                  color={focused ? '#1ABC9C' : '#333'}
                />
              );
              break;

            case 'Documents':
              icon = (
                <Ionicons
                  name="document-text-outline"
                  size={moderateScale(24)}
                  color={focused ? '#1ABC9C' : '#333'}
                />
              );
              break;

            case 'Chat':
              icon = (
                <Feather
                  name="message-square"
                  size={moderateScale(24)}
                  color={focused ? '#1ABC9C' : '#333'}
                />
              );
              break;
          }

          return icon;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Documents" component={DocumentScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: verticalScale(55),
    paddingBottom: verticalScale(5),
    paddingTop: verticalScale(5),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0,
    elevation: 5,
  },
});

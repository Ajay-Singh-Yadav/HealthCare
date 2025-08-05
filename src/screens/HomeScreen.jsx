import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeCard from '../components/HomeCard';
import { useNavigation } from '@react-navigation/native';

import Transactions from '../components/TransactionsList';

import auth from '@react-native-firebase/auth';

import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../graphql/queries/transactions';
import { useTheme } from '../constants/ThemeContext';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const HomeScreen = () => {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const user = auth().currentUser;
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  const transactions = data?.transactions ?? [];

  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await AsyncStorage.getItem('username');
      if (name) setUsername(name);
    };
    fetchUsername();
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bgColor }]}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require('../assets/images/boy.png')
            }
            style={styles.avatar}
          />

          <View>
            <Text style={{ color: theme.text }}>Hello</Text>
            <Text style={[styles.UserName, { color: theme.text }]}>
              {user?.displayName
                ? user.displayName
                : username
                ? username
                : 'User'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.serachIcons, { backgroundColor: theme.serachIconBg }]}
          onPress={() => {
            navigation.navigate('Search');
          }}
        >
          <Ionicons name="search" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardWrapper}>
        <HomeCard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </View>

      <Text style={[styles.RecentTransactionText, { color: theme.text }]}>
        Recent Transaction
      </Text>

      <Transactions />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add')}
      >
        <Entypo name="plus" size={35} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  avatar: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(25),
  },
  avatarContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  serachIcons: {
    borderRadius: scale(50),
    padding: moderateScale(10),
    marginRight: moderateScale(10),
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  RecentTransactionText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginLeft: moderateScale(20),
    marginTop: verticalScale(10),
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: scale(60),
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scale(30),
    bottom: scale(30),
    alignSelf: 'center',
    zIndex: 10,
  },
  UserName: {
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
});

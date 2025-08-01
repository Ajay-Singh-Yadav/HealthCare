import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeCard from '../components/HomeCard';
import { useNavigation } from '@react-navigation/native';

import Transactions from '../components/TransactionsList';

import auth from '@react-native-firebase/auth';

import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../graphql/queries/transactions';

const HomeScreen = () => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
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
            <Text style={{ color: 'white' }}>Hello</Text>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
              {user?.displayName
                ? user.displayName
                : username
                ? username
                : 'User'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.serachIcons}
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

      <Text style={styles.RecentTransactionText}>Recent Transaction</Text>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatarContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  serachIcons: {
    backgroundColor: '#1f2937',
    borderRadius: 50,
    marginRigh: 50,
    padding: 10,
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  RecentTransactionText: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 10,
    color: '#fff',
    marginBottom: 6,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 60,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 30,
    alignSelf: 'center',
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    height: '95%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  input: {
    backgroundColor: colors.neutral600,
    color: 'white',
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    marginRight: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 12,
    marginLeft: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
});

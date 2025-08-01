import React, { useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../graphql/queries/transactions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getCategoryColor from '../constants/getCategoryColor';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRefetch } from '../constants/RefetchContext';

const getCategoryIcon = (type, category) => {
  if (type.toLowerCase() === 'income') {
    return { name: 'rupee-sign', color: '#fff', Icon: FontAwesome5 };
  }
  switch (category) {
    case 'Food & Drinks':
      return { name: 'fastfood', color: '#fff', Icon: MaterialIcons };
    case 'Travel':
      return { name: 'car', color: '#fff', Icon: FontAwesome5 };
    case 'Entertainment':
      return { name: 'theater-masks', color: '#fff', Icon: FontAwesome5 };
    case 'Loan EMIs':
      return { name: 'money-bill', color: '#fff', Icon: FontAwesome5 };
    case 'Rent':
      return { name: 'home', color: '#fff', Icon: FontAwesome5 };
    case 'Bills':
      return { name: 'file-invoice', color: '#fff', Icon: FontAwesome5 };
    case 'Health Care':
      return { name: 'heartbeat', color: '#fff', Icon: FontAwesome5 };
    case 'Shopping':
      return { name: 'shopping-bag', color: '#fff', Icon: FontAwesome5 };
    case 'Vacation':
      return { name: 'umbrella-beach', color: '#fff', Icon: FontAwesome5 };
    case 'Subscriptions':
      return { name: 'notifications', color: '#fff', Icon: MaterialIcons };
    default:
      return { name: 'th-large', color: '#fff', Icon: FontAwesome5 };
  }
};

const TransactionsList = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_TRANSACTIONS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  const navigation = useNavigation();

  const { shouldRefetch, setShouldRefetch } = useRefetch();

  useFocusEffect(
    useCallback(() => {
      if (shouldRefetch) {
        refetch();
        setShouldRefetch(false);
      }
    }, [shouldRefetch]),
  );

  if (loading && networkStatus !== 4) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) {
    return (
      <Text style={{ color: 'red', padding: 16 }}>Error: {error.message}</Text>
    );
  }

  const transactions = [...(data?.transactions ?? [])].sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  if (transactions.length === 0) {
    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#aaa' }}>No transactions found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={transactions}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => {
        const { name, color, Icon } = getCategoryIcon(item.type, item.category);

        return (
          <TouchableOpacity
            style={{
              backgroundColor: '#1f2937',
              marginBottom: 12,
              borderRadius: 12,
              padding: 12,
              elevation: 4,
            }}
            onPress={() => {
              navigation.navigate('TransactionDetails', { transactions: item });
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View
                  style={{
                    backgroundColor: getCategoryColor(item.type, item.category),
                    padding: 10,
                    borderRadius: 10,
                    width: 45,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name={name} size={20} color={color} />
                </View>

                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.type === 'income'
                      ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
                      : item.category}
                  </Text>
                  <Text style={{ color: '#aaa', fontSize: 13 }}>
                    Wallet:{' '}
                    {item.wallet.charAt(0).toUpperCase() + item.wallet.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    color: item.type === 'income' ? '#22c55e' : '#ef4444',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {item.type === 'income' ? '+' : '-'}₹{item.amount}
                </Text>
                <Text style={{ color: '#ccc', fontSize: 12 }}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default TransactionsList;

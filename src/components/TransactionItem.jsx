import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TransactionItem = ({ transaction }) => {
  const isPositive = transaction.amount > 0;

  return (
    <View style={styles.item}>
      <View
        style={[styles.iconContainer, { backgroundColor: transaction.color }]}
      >
        <MaterialCommunityIcons
          name={transaction.icon}
          size={20}
          color="#fff"
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{transaction.type}</Text>
        <Text style={styles.subtitle}>{transaction.subtitle}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text
          style={[styles.amount, { color: isPositive ? '#00cc66' : '#ff4d4d' }]}
        >
          {isPositive ? '+' : '-'}${Math.abs(transaction.amount)}
        </Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
  },
  subtitle: {
    color: '#888',
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
});

export default TransactionItem;

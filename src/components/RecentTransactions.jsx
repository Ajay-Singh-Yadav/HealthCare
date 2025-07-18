import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useRecentTxtStyle from '../hooks/useRecentTxtStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import categories from '../constant/categories';
import Sizes from '../utils/responsive';
import { useTheme } from '../context/ThemeContext';

import { useMutation } from '@apollo/client';
import { DELETE_TRANSACTION } from '../Graphql/mutations/mutations';
import { GET_TRANSACTIONS } from '../Graphql/queries/queries';

const RecentTransactions = ({ transactions }) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    update(cache, { data: { deleteTransaction } }) {
      const existing = cache.readQuery({ query: GET_TRANSACTIONS });

      if (existing?.transactions) {
        const newTxns = existing.transactions.filter(
          txn => txn.id !== deleteTransaction.id,
        );

        cache.writeQuery({
          query: GET_TRANSACTIONS,
          data: { transactions: newTxns },
        });
      }
    },
  });

  const handleDelete = id => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction({ variables: { id } }),
        },
      ],
    );
  };

  const styles = useRecentTxtStyle();
  const { theme } = useTheme();

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  const renderItem = ({ item }) => {
    const matchedCategory = categories.find(cat => cat.name === item.category);
    const CategoryIcon = matchedCategory?.lib;
    const categoryIconName = matchedCategory?.icon;

    return (
      <View style={styles.container}>
        <View style={styles.LeftView}>
          {CategoryIcon && (
            <CategoryIcon
              name={categoryIconName}
              size={Sizes.scale(20)}
              color={theme.text}
              style={styles.recentIcon}
            />
          )}
          <View style={styles.slaryView}>
            <Text style={styles.salaryText}>{item.title}</Text>
            <View style={styles.categoryView}>
              <MaterialIcons
                name="category"
                size={Sizes.scale(12)}
                color={theme.text}
              />
              <Text style={styles.datetext}>{item.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rightView}>
          <View>
            <Text
              style={[
                styles.amoutText,
                { color: item.type === 'Income' ? '#2ECC71' : '#E74C3C' },
              ]}
            >
              {item.type === 'Income' ? '+ ' : '- '}₹{item.amount.toFixed(2)}
            </Text>
            <Text style={[styles.datetext, { textAlign: 'center' }]}>
              {' '}
              {new Date(item.timestamp).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.deleteIcon}>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <MaterialIcons
                name="delete"
                size={Sizes.scale(22)}
                color="red"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={sortedTransactions}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.contentConatiner}
    />
  );
};

export default RecentTransactions;

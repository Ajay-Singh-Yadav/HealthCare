import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GET_TRANSACTIONS } from '../graphql/queries/transactions';
import { useQuery } from '@apollo/client';
import { getCategoryIcon } from '../constants/getCategoryIcon';
import getCategoryColor from '../constants/getCategoryColor';

const SearchScreen = () => {
  const navigation = useNavigation();

  const { data } = useQuery(GET_TRANSACTIONS);

  const transactions = data?.transactions;

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredData(transactions);
      return;
    }

    const lowerSearch = searchText.toLowerCase();

    const filterd = transactions?.filter(
      tx =>
        tx.category?.toLowerCase().includes(lowerSearch) ||
        tx.wallet?.toLowerCase().includes(lowerSearch) ||
        tx.type?.toLowerCase().includes(lowerSearch),
    );
    setFilteredData(filterd);
  }, [searchText, transactions]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color={'#aaa'}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search by category, wallet, or type"
          style={styles.inputText}
          placeholderTextColor={'#aaa'}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const { name, color, Icon } = getCategoryIcon(
            item.type,
            item.category,
          );

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
                navigation.navigate('TransactionDetails', {
                  transactions: item,
                });
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View
                    style={{
                      backgroundColor: getCategoryColor(
                        item.type,
                        item.category,
                      ),
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
                      {item.wallet.charAt(0).toUpperCase() +
                        item.wallet.slice(1)}
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
                  <Text style={{ color: '#ccc', fontSize: 12 }}>
                    {item.date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 60,
    marginTop: 20,
    marginHorizontal: 15,
    padding: 5,
    gap: 10,
    borderWidth: 1,
    borderColor: '#525252',
    marginBottom: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  inputText: {
    color: '#fff',
    flex: 1,
  },
});

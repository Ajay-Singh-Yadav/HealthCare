import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useRoute } from '@react-navigation/native';

import { expenseCategories } from '../constants/ExpenseCategories';
import { WalletContext } from '../constants/WalletContext';

const TransactionDetailsScreen = () => {
  const route = useRoute();
  const { transactions } = route.params;

  const { wallets } = useContext(WalletContext);

  const [selectedType, setSelectedType] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current && transactions) {
      setSelectedType(transactions.type);
      setSelectedWallet(transactions.wallet);
      setSelectedCategory(transactions.category || '');
      setAmount(transactions.amount.toString());
      setDescription(transactions.description || '');
      isMounted.current = true;
    }
  }, [transactions]);

  const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  return (
    <SafeAreaView style={{ padding: 16, marginTop: 80 }}>
      {/* Type */}
      <Dropdown
        data={typeOptions}
        labelField="label"
        valueField="value"
        value={selectedType}
        onChange={item => setSelectedType(item.value)}
        placeholder="Select Type"
      />

      {/* Wallet */}
      <Dropdown
        data={wallets}
        labelField="label"
        valueField="value"
        value={selectedWallet}
        onChange={item => setSelectedWallet(item.value)}
        placeholder="Select Wallet"
      />

      {/* Category (Only show if Expense type) */}
      {selectedType === 'expense' && (
        <Dropdown
          data={expenseCategories}
          labelField="label"
          valueField="value"
          value={selectedCategory}
          onChange={item => setSelectedCategory(item.value)}
          placeholder="Select Category"
        />
      )}

      {/* Amount */}
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginTop: 12 }}
      />

      {/* Description */}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        style={{ borderBottomWidth: 1, marginTop: 12 }}
      />
    </SafeAreaView>
  );
};

export default TransactionDetailsScreen;

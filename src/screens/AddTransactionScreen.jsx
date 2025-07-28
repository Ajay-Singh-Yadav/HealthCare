import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations/mutations';

import { WalletContext } from '../constants/WalletContext';

const AddTransactionScreen = () => {
  const { wallets } = useContext(WalletContext);

  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const typeOptions = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  const expenseCategories = [
    { label: 'Food & Drinks', value: 'Food & Drinks' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Movies', value: 'Movies' },
    { label: 'Loan EMIs', value: 'Loan EMIs' },
    { label: 'Rent', value: 'Rent' },
    { label: 'Bills', value: 'Bills' },
    { label: 'Health', value: 'Health' },
    { label: 'Shopping', value: 'Shopping' },
  ];

  const handleSave = async () => {
    try {
      if (!type || !wallet || !amount) {
        alert('Please fill in all required fields.');
        return;
      }
      setIsLoading(true);

      const amountFloat = parseFloat(amount);
      const date = new Date().toISOString().split('T')[0];

      const { data } = await addTransaction({
        variables: {
          type,
          wallet,
          amount: amountFloat,
          category,
          date,
          description,
        },
      });

      console.log('✅ Transaction added:', data.addTransaction);

      setTimeout(() => {
        setAmount('');
        setWallet('');
        setCategory('');
        setDescription('');
        setType('');
      }, 1500);
    } catch (e) {
      console.error('❌ Error adding transaction:', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerConatiner}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={25} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headingText}>Add Transaction</Text>
          </View>

          <Text style={styles.label}>Type</Text>
          <Dropdown
            data={typeOptions}
            labelField="label"
            valueField="value"
            value={type}
            onChange={item => setType(item.value)}
            placeholder="Select type"
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={{ backgroundColor: '#1f2937' }}
            renderRightIcon={() => (
              <Ionicons name="chevron-down" size={20} color="#888" />
            )}
            renderItem={(item, selected) => (
              <View
                style={{
                  backgroundColor: selected ? '#374151' : '#1f2937',
                  padding: 12,
                }}
              >
                <Text style={{ color: '#fff' }}>{item.label}</Text>
              </View>
            )}
          />

          <Text style={styles.label}>Wallet</Text>
          <Dropdown
            data={wallets}
            labelField="label"
            valueField="value"
            value={wallet}
            onChange={item => setWallet(item.value)}
            placeholder="Select wallet"
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={{ backgroundColor: '#1f2937' }}
            renderRightIcon={() => (
              <Ionicons name="chevron-down" size={20} color="#888" />
            )}
            renderItem={(item, selected) => (
              <View
                style={{
                  backgroundColor: selected ? '#374151' : '#1f2937',
                  padding: 12,
                }}
              >
                <Text style={{ color: '#fff' }}>{item.label}</Text>
              </View>
            )}
          />

          {type === 'expense' && (
            <>
              <Text style={styles.label}>Expense Category</Text>
              <Dropdown
                data={expenseCategories}
                labelField="label"
                valueField="value"
                value={category}
                onChange={item => setCategory(item.value)}
                placeholder="Select category"
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={{ backgroundColor: '#1f2937' }}
                renderRightIcon={() => (
                  <Ionicons name="chevron-down" size={20} color="#888" />
                )}
                renderItem={(item, selected) => (
                  <View
                    style={{
                      backgroundColor: selected ? '#374151' : '#1f2937',
                      padding: 12,
                    }}
                  >
                    <Text style={{ color: '#fff' }}>{item.label}</Text>
                  </View>
                )}
              />
            </>
          )}

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            placeholderTextColor="#888"
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  headerConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 90,
    marginBottom: 20,
  },
  headingText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    padding: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  label: {
    color: '#ccc',
    marginTop: 12,
    marginBottom: 4,
  },
  dropdown: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  placeholderStyle: {
    color: '#888',
  },
  selectedTextStyle: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#1f2937',
    height: 60,
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: '#4CAF50',
    marginTop: 30,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default AddTransactionScreen;

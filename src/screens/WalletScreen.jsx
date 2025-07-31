import React, { useCallback, useContext, useState } from 'react';
import { WalletContext } from '../constants/WalletContext';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../graphql/queries/transactions';

const { width, height } = Dimensions.get('window');

const WalletScreen = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  const [modalVisible, setModalVisible] = useState(false);
  const { addWallet } = useContext(WalletContext);
  const [walletName, setWalletName] = useState('');

  const transactions = data?.transactions || [];

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const incomePerWallet = {};
  transactions.forEach(tx => {
    if (tx.type === 'income') {
      const wallet = tx.wallet;
      const amount = parseFloat(tx.amount);
      if (!incomePerWallet[wallet]) {
        incomePerWallet[wallet] = 0;
      }
      incomePerWallet[wallet] += amount;
    }
  });

  const walletBalances = {};
  transactions.forEach(tx => {
    const wallet = tx.wallet;
    const amount = parseFloat(tx.amount);
    if (!walletBalances[wallet]) {
      walletBalances[wallet] = 0;
    }

    if (tx.type === 'income') {
      walletBalances[wallet] += amount;
    } else if (tx.type === 'expense') {
      walletBalances[wallet] -= amount;
    }
  });

  const walletList = Object.keys(walletBalances).map((wallet, index) => ({
    id: String(index),
    name: wallet,
    value: wallet,
    currentBalance: walletBalances[wallet], // income - expense
    initialIncome: incomePerWallet[wallet] || 0, // only income
    image: require('../assets/images/splashImage.png'),
  }));

  const handleWallet = () => {
    if (!walletName.trim()) return;
    addWallet(walletName);
    setWalletName('');
    closeModal();
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setWalletName('');
  };

  const renderWallet = ({ item }) => (
    <TouchableOpacity style={styles.walletRow} onPress={() => {}}>
      <Image source={item.image} style={styles.walletImage} />
      <View>
        <Text style={styles.walletName}>
          {' '}
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.walletAmount}>
          ₹ {item.currentBalance} left of ₹ {item.initialIncome}
        </Text>
      </View>
      <Icon
        name="chevron-right"
        size={24}
        color="#888"
        style={{ marginLeft: 'auto' }}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111827',
        }}
      >
        <ActivityIndicator size="large" color="#9DFF00" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111827',
        }}
      >
        <Text style={{ color: 'red', padding: 16 }}>
          Error: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Wallet</Text>
      <Text style={styles.balance}>₹ {totalBalance.toFixed(2)}</Text>
      <Text style={styles.subText}>Total balance</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>My Wallets</Text>
          <TouchableOpacity onPress={openModal}>
            <Icon name="add-circle" size={26} color="#9DFF00" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={walletList}
          keyExtractor={item => item.id}
          renderItem={renderWallet}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={closeModal}
          />
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={40}
            style={styles.keyboardView}
          >
            <Text style={styles.modalTitle}>Add Wallet</Text>
            <Text style={styles.iconText}>Wallet Name</Text>
            <TextInput
              placeholder="Wallet name"
              value={walletName}
              onChangeText={setWalletName}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <Text style={styles.iconText}>
              Wallet Icon <Text style={styles.optionalText}>(optional)</Text>
            </Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Feather name="upload" size={24} color="white" />
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWallet} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#111827',
    flexGrow: 1,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    width: 40,
  },
  balance: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 25,
  },
  subText: {
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  walletImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
  },
  walletName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  walletAmount: {
    color: '#9DFF00',
    fontSize: 14,
  },
  keyboardView: {
    backgroundColor: '#1f2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1f2937',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  iconText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    marginHorizontal: 20,
  },
  optionalText: {
    color: '#888',
    fontSize: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

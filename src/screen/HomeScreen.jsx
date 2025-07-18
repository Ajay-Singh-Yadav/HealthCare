import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useHomeScreenStyle from '../hooks/useHomeScreenStyle';
import CardSection from '../components/CardSection';
import RecentTransactions from '../components/RecentTransactions';
import CategoryDropdown from '../components/CategoryDropdown';
import LottieView from 'lottie-react-native';

import { useQuery } from '@apollo/client';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_CATEGORY,
} from '../Graphql/queries/queries';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = useHomeScreenStyle();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showLoader, setShowLoader] = useState(true);

  // Always fetch all transactions
  const {
    data: allData,
    loading: allLoading,
    error: allError,
    refetch: refetchAll,
  } = useQuery(GET_TRANSACTIONS, {
    fetchPolicy: 'network-only',
  });

  // Conditionally fetch category transactions
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useQuery(GET_TRANSACTIONS_BY_CATEGORY, {
    variables: { category: selectedCategory },
    skip: !selectedCategory || selectedCategory === 'All',
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (isFocused) {
      refetchAll();
      if (selectedCategory && selectedCategory !== 'All') {
        refetchCategory();
      }
    }
  }, [isFocused, selectedCategory]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loading =
    allLoading ||
    (selectedCategory && selectedCategory !== 'All' && categoryLoading);
  const error =
    allError ||
    (selectedCategory && selectedCategory !== 'All' && categoryError);

  const allTransactions = allData?.transactions || [];

  const displayedTransactions =
    selectedCategory && selectedCategory !== 'All'
      ? categoryData?.transactionsByCategory || []
      : allTransactions;

  const originalTransactions = allData?.transactions || [];

  const income = originalTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = originalTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <LottieView
            source={require('../assets/animations/loader.json')}
            autoPlay
            loop={false}
            style={styles.errorLottie}
          />
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>Ajay</Text>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddTransaction')}
          >
            <Ionicons name={'add'} size={20} color="#fff" />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleProfile}>
            <Ionicons
              name="settings-outline"
              size={Sizes.scale(20)}
              color={theme.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Section */}
      <CardSection income={income} expense={expense} balance={balance} />

      {/* Filter + Transaction Header */}
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>Recent Transaction</Text>
        <View style={{ zIndex: 1000 }}>
          {/* <CategoryDropdown
            selectedCategory={selectedCategory}
            onSelectCategory={category => setSelectedCategory(category)}
          /> */}
          <CategoryDropdown
            selectedCategory={selectedCategory}
            onSelectCategory={category => {
              setShowLoader(true); // show animation
              setSelectedCategory(category);
              setTimeout(() => {
                setShowLoader(false); // hide after 2 sec
              }, 1000);
            }}
          />
        </View>
      </View>

      {/* Recent Transactions */}

      {showLoader ? (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../assets/animations/loader.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : displayedTransactions.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: theme.text }}>No transactions found</Text>
        </View>
      ) : (
        <RecentTransactions transactions={displayedTransactions} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

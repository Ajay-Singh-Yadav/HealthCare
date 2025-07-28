import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeCard = ({ totalBalance, totalIncome, totalExpense }) => {
  return (
    <ImageBackground
      source={require('../assets/images/card.png')}
      resizeMode="stretch"
      style={styles.constainer}
    >
      <Text style={styles.totalBalanceText}>Total Balance</Text>

      <Text style={styles.totalBalanceAmount}>₹ {totalBalance}.00</Text>

      <View style={styles.IncomeExpenseContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: 'green',
              borderRadius: 60,
              padding: 3,
              marginRight: 5,
            }}
          >
            <Ionicons name="arrow-up" size={20} color="white" />
          </View>
          <Text style={styles.IncomeText}>Income</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: 'red',
              borderRadius: 60,
              padding: 3,
              marginRight: 5,
            }}
          >
            <Ionicons name="arrow-down" size={20} color="white" />
          </View>
          <Text style={styles.ExpenseText}>Expense</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 28,
          marginTop: 15,
        }}
      >
        <View style={styles.IncomeAmountConatiner}>
          <MaterialCommunityIcons name="currency-inr" size={22} color="green" />
          <Text style={styles.IncomeAmount}>{totalIncome}</Text>
        </View>
        <View style={styles.ExpenseAmountContainer}>
          <MaterialCommunityIcons name="currency-inr" size={22} color="red" />
          <Text style={styles.ExpenseAmount}>{totalExpense}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  constainer: {
    width: 470,
    height: 300,
  },
  totalBalanceText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    color: '#3B3B3B',
  },
  totalBalanceAmount: {
    fontSize: 25,
    fontWeight: '600',
    marginLeft: 32,
    marginTop: 13,
  },

  IncomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  IncomeText: {
    fontSize: 15,
    fontWeight: '400',
  },
  ExpenseText: {
    fontSize: 15,
    fontWeight: '400',
  },
  IncomeExpenseAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  IncomeAmount: {
    color: 'green',
    fontSize: 18,
    fontWeight: '500',
  },
  ExpenseAmount: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500',
  },
  ExpenseAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 28,
  },
  IncomeAmountConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

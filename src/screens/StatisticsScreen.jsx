import { LineChart } from 'react-native-chart-kit';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '../graphql/queries/transactions';
import moment from 'moment';

import Transactions from '../components/TransactionsList';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const StatisticsScreen = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState('Weekly');
  const tabs = ['Weekly', 'Monthly', 'Yearly'];

  const transactions = data?.transactions ?? [];

  const filteredTransactions = useMemo(() => {
    const now = moment();
    if (activeTab === 'Weekly') {
      return transactions.filter(t => moment(t.date).isSame(now, 'week'));
    } else if (activeTab === 'Monthly') {
      return transactions.filter(t => moment(t.date).isSame(now, 'month'));
    } else if (activeTab === 'Yearly') {
      return transactions.filter(t => moment(t.date).isSame(now, 'year'));
    }
    return transactions;
  }, [transactions, activeTab]);

  const chartData = useMemo(() => {
    let grouped = {};
    let labels = [];
    let values = [];

    if (activeTab === 'Weekly') {
      const weekStart = moment().startOf('week'); // Sunday
      const labelsOrder = [];

      // Sunday to Saturday (7 days)
      for (let i = 0; i < 7; i++) {
        const day = weekStart.clone().add(i, 'days').format('ddd');
        labelsOrder.push(day);
        grouped[day] = 0;
      }

      labels.push(...labelsOrder); // maintain correct order

      filteredTransactions.forEach(t => {
        const day = moment(t.date).format('ddd');
        if (grouped[day] !== undefined) {
          grouped[day] += t.amount;
        }
      });
    } else if (activeTab === 'Monthly') {
      const startOfMonth = moment().startOf('month');
      const endOfMonth = moment().endOf('month');

      // Move to the Sunday before or equal to the 1st of the month
      let currentWeekStart = startOfMonth.clone().startOf('week'); // Sunday
      let weekCount = 1;

      // Prepare grouped data
      while (currentWeekStart.isBefore(endOfMonth)) {
        const label = `Week ${weekCount}`;
        labels.push(label);
        grouped[label] = 0;

        currentWeekStart.add(1, 'week');
        weekCount++;
      }

      // Group each transaction
      filteredTransactions.forEach(t => {
        const txDate = moment(t.date);

        let weekStart = startOfMonth.clone().startOf('week'); // Sunday
        let labelIndex = 1;

        while (weekStart.isBefore(endOfMonth)) {
          const weekEnd = weekStart.clone().endOf('week');

          if (txDate.isBetween(weekStart, weekEnd, 'day', '[]')) {
            const label = `Week ${labelIndex}`;
            grouped[label] += t.amount;
            break;
          }

          weekStart.add(1, 'week');
          labelIndex++;
        }
      });
    } else if (activeTab === 'Yearly') {
      for (let i = 0; i < 12; i++) {
        const month = moment().month(i).format('MMM');
        labels.push(month);
        grouped[month] = 0;
      }
      filteredTransactions.forEach(t => {
        const month = moment(t.date).format('MMM');
        grouped[month] += t.amount;
      });
    }

    values = labels.map(label => grouped[label]);
    return { labels, datasets: [{ data: values }] };
  }, [filteredTransactions, activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Statistics</Text>

      <View>
        <LineChart
          data={chartData}
          width={screenWidth - 25} // 20 left + 20 right
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{ marginVertical: 10, borderRadius: 8, alignSelf: 'center' }}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <Text style={styles.subHeading}>Transactions</Text>
      <Transactions />
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 20,
  },

  backButton: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: '#374151',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  subHeading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 20,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 13,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#9ca3af',
    fontSize: 12,
  },
});

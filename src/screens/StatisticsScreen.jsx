import { LineChart } from 'react-native-chart-kit';
import React, { useState } from 'react';
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

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const StatisticsScreen = () => {
  const [activeTab, setActiveTab] = useState('Weekly');

  const tabs = ['Weekly', 'Monthly', 'Yearly'];

  const transactions = [
    {
      id: 1,
      title: 'Health',
      subtitle: 'checkup fee',
      amount: -25,
      date: '11 Dec',
      icon: <Ionicons name="heart" size={24} color="white" />,
      bgColor: '#f43f5e',
    },
    {
      id: 2,
      title: 'Income',
      subtitle: 'Gift from Family',
      amount: 60,
      date: '10 Dec',
      icon: <FontAwesome5 name="dollar-sign" size={20} color="white" />,
      bgColor: '#10b981',
    },
    {
      id: 3,
      title: 'Clothing',
      subtitle: 'Winter Clothing',
      amount: -20,
      date: '10 Dec',
      icon: (
        <MaterialCommunityIcons name="tshirt-crew" size={22} color="white" />
      ),
      bgColor: '#6366f1',
    },
    {
      id: 4,
      title: 'Income',
      subtitle: 'Cashback from Credit Card',
      amount: 90,
      date: '9 Dec',
      icon: <FontAwesome5 name="dollar-sign" size={20} color="white" />,
      bgColor: '#10b981',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Statistics</Text>

      <View>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{ data: [20, 45, 28, 80] }],
          }}
          width={screenWidth - 16}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{ marginVertical: 8, borderRadius: 8 }}
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

      {/* Transactions */}
      <Text style={styles.subHeading}>Transactions</Text>
      <ScrollView style={{ marginTop: 8 }}>
        {transactions.map(item => (
          <View key={item.id} style={styles.transactionCard}>
            <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
              {item.icon}
            </View>
            <View style={styles.transactionText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.amount,
                  { color: item.amount >= 0 ? '#10b981' : '#ef4444' },
                ]}
              >
                {item.amount >= 0
                  ? `+ $${item.amount}`
                  : `- $${Math.abs(item.amount)}`}
              </Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'space-between',
    marginBottom: 20,
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

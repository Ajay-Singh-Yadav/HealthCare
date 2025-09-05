import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../navigation/AuthContext';

const CalendarScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.logoutBtn}
        onPress={logout}
        accessibilityRole="button"
        testID="logoutButton"
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, color: 'black', marginBottom: 20 },
  logoutBtn: {
    backgroundColor: '#F83758',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

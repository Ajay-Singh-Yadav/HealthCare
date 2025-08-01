import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previous => !previous);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'}
          size={24}
          color={isDarkMode ? '#374151' : '#fff'}
        />
        <Text style={styles.label}>Dark Mode</Text>
      </View>

      <Switch
        trackColor={{ false: '#767577', true: '#374151' }}
        thumbColor={isDarkMode ? '#111827' : '#f4f3f4'}
        ios_backgroundColor="#030202ff"
        onValueChange={toggleSwitch}
        value={isDarkMode}
        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
});

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../navigation/AuthContext';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/defaultAvatar.png')} // your image here
          style={styles.avatar}
        />
        <Text style={styles.name}>Syed Noman</Text>
        <Text style={styles.email}>Syed@gmail.com</Text>
      </View>

      {/* Options List */}
      <View style={styles.options}>
        <OptionItem icon="person" label="Edit Profile" />
        <OptionItem icon="settings" label="Settings" />
        <OptionItem icon="lock-closed" label="Privacy Policy" />
        <OptionItem
          icon="power"
          label="Logout"
          iconColor="#e74c3c"
          onPress={logout}
        />
      </View>
    </View>
  );
};

const OptionItem = ({ icon, label, iconColor = '#ccc', onPress }) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <View style={[styles.optionIconBox, { backgroundColor: `${iconColor}22` }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>
    <Text style={styles.optionLabel}>{label}</Text>
    <MaterialCommunityIcons
      name="chevron-right"
      size={24}
      color="#888"
      style={{ marginLeft: 'auto' }}
    />
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // dark theme
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#aaa',
  },
  options: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionIconBox: {
    width: 35,
    height: 35,
    backgroundColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionLabel: {
    fontSize: 16,
    color: '#fff',
  },
});

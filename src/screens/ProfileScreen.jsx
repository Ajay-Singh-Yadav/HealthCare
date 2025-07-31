import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../navigation/AuthContext';

import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  const user = auth().currentUser;

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => logout(),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}

      <Text style={styles.headerText}>Profile</Text>
      <View style={styles.header}>
        <Image
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require('../assets/images/boy.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Options List */}
      <View style={styles.options}>
        <OptionItem icon="person" label="Edit Profile" iconColor="#fff" />
        <OptionItem
          icon="settings"
          label="Settings"
          iconColor="#fff"
          onPress={() => {}}
        />
        <OptionItem
          icon="lock-closed"
          label="Privacy Policy"
          iconColor="#fff"
        />
        <OptionItem
          icon="power"
          label="Logout"
          iconColor="#e74c3c"
          withBg={true}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const OptionItem = ({ icon, label, iconColor, onPress, withBg = false }) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <View
      style={[
        styles.optionIconBox,
        { backgroundColor: withBg ? `${iconColor}22` : 'transparent' },
      ]}
    >
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
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
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

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import getAuth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import useProfileStyle from '../hooks/useProfileStyle';
import { useTheme } from '../context/ThemeContext';
import useModalStyle from '../hooks/useModalStyle';
import Sizes from '../utils/responsive';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const styles = useProfileStyle();
  const modalStyle = useModalStyle();

  const { currentTheme, setTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await getAuth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-sharp"
              size={Sizes.scale(20)}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.header}>Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AS</Text>
          </View>
          <View>
            <Text style={styles.name}>Ajay Singh Yadav</Text>
            <Text style={styles.number}>8923442408 </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>App Settings</Text>

        <TouchableOpacity
          style={[styles.menuItem, { justifyContent: 'space-between' }]}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.menuContent}>
            <Ionicons name="color-palette-outline" size={20} color="#000" />
            <Text style={styles.menuText}>App theme</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={Sizes.fontSM}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Help & Support</Text>

        <View style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={20} color="#000" />
          <Text style={styles.menuText}>Contact: Help & support</Text>
        </View>

        <View style={styles.menuItem}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color="#000"
          />
          <Text style={styles.menuText}>About Expense Tracker</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>App Version 1.0.0</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyle.modalOverlay}>
            <View style={modalStyle.modalView}>
              <Text style={modalStyle.modalTitle}>Select Theme</Text>

              {['coffee', 'dark', 'forest', 'ocean', 'purple'].map(option => (
                <Pressable
                  key={option}
                  style={modalStyle.radioButton}
                  onPress={() => {
                    setTheme(option);
                    setModalVisible(false);
                  }}
                >
                  <Ionicons
                    name={
                      currentTheme === option
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={20}
                    color="#000"
                  />
                  <Text style={modalStyle.radioText}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </Pressable>
              ))}

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={modalStyle.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

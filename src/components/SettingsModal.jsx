import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeToggleButton } from './ThemeToggleButton';

const { height } = Dimensions.get('window');

export const SettingsModal = ({ visible, onClose, title }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.fullScreenModal}>
          {/* Header */}
          <View style={styles.headerConatiner}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Ionicons name="chevron-back" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>

          {/* Theme */}
          <ThemeToggleButton />

          {/* Notification */}

          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <Text style={styles.sectionTitle}>🧍‍♂️ About & Support</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#374151',
    borderRadius: 10,
    marginRight: 10,
    padding: 5,
    alignItems: 'center',
  },
  fullScreenModal: {
    height: height * 1,
    width: '100%',
    backgroundColor: '#1f2937',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#374151',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  modalCloseText: {
    color: '#fff',
  },
  date: {
    fontSize: 14,
    marginBottom: 20,
    color: '#9ca3af',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 16,
    marginBottom: 4,
    color: '#fff',
  },
  text: {
    fontSize: 15,
    color: '#9ca3af',
    lineHeight: 22,
  },
});

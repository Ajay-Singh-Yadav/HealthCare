import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '555583208374-uler3lak1dorme2ipstvhrdggn5v35jd.apps.googleusercontent.com',
});
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../navigation/AuthContext';

const NumberLogInScreen = () => {
  const [confirm, setConfirm] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');

  const [codeSent, setCodeSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('Send OTP');

  const navigation = useNavigation();

  const { login } = useContext(AuthContext);

  const saveUserLocally = async username => {
    try {
      await AsyncStorage.setItem('username', username);
      console.log('✅ Username saved locally');
    } catch (error) {
      console.log('❌ Error saving username locally:', error);
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (phoneNumber.length < 13) {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit phone number',
      );
      return;
    }

    console.log('Sending OTP to:', phoneNumber);
    setLoading(true);
    setStatusText('Sending OTP...');
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setStatusText('Verify OTP');
      setCodeSent(true);
      Alert.alert('OTP Sent', 'Please check your phone.');
    } catch (error) {
      console.log('OTP send error:', error);
      Alert.alert('Error', 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyCode = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    setLoading(true);
    setStatusText('Verifying...');
    try {
      await confirm.confirm(code);
      await saveUserLocally(userName);
      login();
    } catch (error) {
      console.log('OTP verify error:', error);
      Alert.alert('Error', 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneInput = value => {
    const cleaned = value.replace(/\D/g, '').slice(-10); // ensure 10 digits only
    setPhoneNumber('+91' + cleaned); // add +91 at the beginning
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.LogInText}>
        Mobile LogIn{' '}
        <Entypo
          name="mobile"
          size={20}
          color="#fff"
          style={{ marginRight: 10, alignItems: 'center' }}
        />
      </Text>
      <Text style={styles.title}>Let's</Text>
      <Text style={styles.titleBold}>Get Started</Text>
      <Text style={styles.subtitle}>
        Create an account to track your expenses
      </Text>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Entypo
          name="user"
          size={20}
          color="#aaa"
          style={{ marginRight: 10, alignItems: 'center' }}
        />
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
          style={styles.input}
          maxLength={10}
          value={userName}
          onChangeText={setUserName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Entypo
          name="mobile"
          size={20}
          color="#aaa"
          style={{ marginRight: 10, alignItems: 'center' }}
        />
        <TextInput
          placeholder="Enter your number"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneNumber.replace('+91', '')}
          onChangeText={handlePhoneInput}
        />
      </View>
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#aaa"
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter your OTP"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="numeric"
          secureTextEntry
          value={code}
          onChangeText={setCode}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={codeSent ? handleVerifyCode : handleSendOTP}
        disabled={!phoneNumber}
      >
        <Text style={styles.buttonText}>
          {loading ? statusText : statusText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NumberLogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  LogInText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 90,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '400',
    marginTop: 40,
  },
  titleBold: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 30,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
  },
  button: {
    backgroundColor: '#A3E635',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: '#111827',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
  },
  bottomText: {
    color: '#aaa',
    textAlign: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  loginLink: {
    color: '#A3E635',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const LogInMobileNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  // Step 1: Send verification code
  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      Alert.alert('Code Sent', 'Please enter the verification code.');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  // Step 2: Confirm code
  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      Alert.alert('Login Success', 'You are now signed in!');
      nevigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Invalid Code', 'The code you entered is invalid.');
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      {!confirm ? (
        <>
          <Text>Enter Phone Number:</Text>
          <TextInput
            placeholder="+91xxxxxxxxxx"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />
          <Button title="Send Code" onPress={signInWithPhoneNumber} />
        </>
      ) : (
        <>
          <Text>Enter Verification Code:</Text>
          <TextInput
            placeholder="123456"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />
          <Button title="Verify Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

export default LogInMobileNumberScreen;

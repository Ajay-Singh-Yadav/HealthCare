import React, { use, useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../navigation/AuthContext';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const { login } = useContext(AuthContext);

  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      login();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'That email address is already in use!' });
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ email: 'That email address is invalid!' });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password should be at least 6 characters' });
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Let's</Text>
      <Text style={styles.titleBold}>Get Started</Text>
      <Text style={styles.subtitle}>
        Create an account to track your expenses
      </Text>

      {/* Name Input */}

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
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
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have account */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.loginLink}>LogIn</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  backIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '400',
    marginTop: 30,
  },
  titleBold: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    marginVertical: 20,
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
    fontWeight: 'bold',
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
});

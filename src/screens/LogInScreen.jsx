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

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '555583208374-uler3lak1dorme2ipstvhrdggn5v35jd.apps.googleusercontent.com',
});
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../navigation/AuthContext';

const LogInScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const navigation = useNavigation();

  const { login } = useContext(AuthContext);

  const auth = getAuth();

  const handleLogIn = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password,
      );
      login();
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('No user found for that email.');
      } else if (error.code === 'auth/wrong-password') {
        console.log('Incorrect password.');
      } else {
        console.log(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.idToken || userInfo?.data?.idToken;
      console.log('ID Token:', idToken);
      if (!idToken) {
        Alert.alert('Error', 'Failed to retrieve ID token.');
        return;
      }
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const firebaseUserCredential = await signInWithCredential(
        auth,
        googleCredential,
      );

      const user = firebaseUserCredential.user;
      if (user) {
        login();
      }
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available or outdated.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred during sign-in.');
      }
    }
  };

  //  Mobile Verification
  const handleSendOTP = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setCodeSent(true);
      Alert.alert('OTP Sent', 'Please check your phone.');
    } catch (error) {
      console.log('OTP send error:', error);
    }
  };

  // Confirm OTP
  const handleVerifyCode = async () => {
    try {
      await confirm.confirm(code);
      login();
      Alert.alert('Success', 'You are logged in!');
    } catch (error) {
      console.log('OTP verify error:', error);
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
      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>LogIn</Text>
      </TouchableOpacity>

      {/* Already have account */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.loginLink}>SignUp</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <Ionicons
          name="logo-google"
          size={20}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => navigation.navigate('NumberLogIn')}
      >
        <Ionicons
          name="logo-google"
          size={20}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LogInScreen;

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
    marginTop: 50,
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

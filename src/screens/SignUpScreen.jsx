import React, { use, useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

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

      await userCredential.user.updateProfile({ displayName: name });

      // Call context login
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.SignUpText}>Sign Up</Text>
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

      <Text style={styles.SocialText}>Social Login?</Text>

      <View style={styles.SocialContainer}>
        {/* Number LogIn */}
        <TouchableOpacity
          style={styles.SocialButtons}
          onPress={() => navigation.navigate('NumberLogIn')}
        >
          <Entypo
            name="mobile"
            size={40}
            color="#fff"
            style={{ marginRight: 10, alignItems: 'center' }}
          />
          <Text style={[styles.SocialLoginText, { marginTop: 10 }]}>
            Mobile
          </Text>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity
          style={styles.SocialButtons}
          onPress={handleGoogleSignIn}
        >
          <Image
            source={require('../assets/images/Google.png')}
            style={{ width: 50, height: 50 }}
            resizeMode="cover"
          />
          <Text style={styles.SocialLoginText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SocialButtons}>
          <Image
            source={require('../assets/images/facebook.png')}
            style={{ width: 50, height: 50 }}
            resizeMode="cover"
          />
          <Text style={styles.SocialLoginText}>Facebook</Text>
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
  SignUpText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 80,
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
  SocialText: {
    color: '#fff',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 50,
  },

  SocialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 50,
  },
  SocialLoginText: {
    color: '#fff',
    fontWeight: '200',
    textAlign: 'center',
    fontSize: 12,
  },
  SocialButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

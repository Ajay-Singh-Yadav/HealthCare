import React, { useContext, useRef, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  offlineAccess: true,
  forceCodeForRefreshToken: false,
});

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const COLORS = {
  primary: '#4A90E2',
  text: '#000',
  gray: '#999',
  bg: '#fff',
  error: '#D93025',
  border: '#000',
};

// LogIn Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9]+\.[a-z]{2,}$/,
      'Enter a valid email address',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Social LogIn Button
const SocialButton = memo(({ onPress, loading, iconSource }) => (
  <Pressable style={styles.socialBtn} onPress={onPress} disabled={loading}>
    {loading ? (
      <ActivityIndicator size="small" />
    ) : (
      <Image source={iconSource} style={styles.socialIcon} />
    )}
  </Pressable>
));

const LogInScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const mountedRef = useRef(true);
  const [emailLoading, setEmailLoading] = useState(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const toggleSecureText = useCallback(() => setSecureText(prev => !prev), []);

  const auth = getAuth();

  const handleLogIn = async (values, { setSubmitting }) => {
    setEmailLoading(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        values.email,
        values.password,
      );
      login();
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found for that email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password.');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setEmailLoading(false);
      setSubmitting(false);
    }
  };

  // Google SignIn
  const handleGoogleSignIn = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.idToken || userInfo?.data?.idToken;

      console.log('ID Token:', idToken);
      if (!idToken) {
        Alert.alert('Error', 'Failed to retrieve ID token.');
        setGoogleLoading(false);
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
      setGoogleLoading(false);
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
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Title */}
          <Text style={styles.loginText}>LOGIN</Text>
          <Text style={styles.appName}>Healthcare</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogIn}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={22} style={styles.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Email Id</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Feather name="lock" size={22} style={styles.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      secureTextEntry={secureText}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholderTextColor={COLORS.gray}
                    />
                  </View>
                  <Pressable onPress={toggleSecureText}>
                    <Ionicons
                      name={secureText ? 'eye-off' : 'eye'}
                      size={22}
                      color={COLORS.gray}
                    />
                  </Pressable>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Forgot Password */}
                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgotText}>Forgot Password !</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSubmit}
                  disabled={emailLoading || isSubmitting}
                >
                  {emailLoading || isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          {/* OR */}
          <Text style={styles.orText}>-or Continue with-</Text>

          {/* Social Logins */}
          <View style={styles.socialRow}>
            <SocialButton
              onPress={handleGoogleSignIn}
              loading={googleLoading}
              iconSource={require('../assets/images/Google2.png')}
            />
            <SocialButton
              iconSource={require('../assets/images/facebook2.png')}
            />
            <SocialButton iconSource={require('../assets/images/apple.png')} />
          </View>

          {/* Register */}
          <Text style={styles.registerText}>
            Don't Have an Account :
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('SignUp')}
            >
              {' '}
              Click here to register
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 20,
  },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingVertical: 20 },
  loginText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: { marginRight: 10, color: COLORS.text },
  label: { fontSize: 12, color: COLORS.text },
  input: { fontSize: 16, color: COLORS.text, padding: 0 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: { color: COLORS.primary, fontWeight: '500' },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    color: COLORS.gray,
  },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialBtn: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  socialIcon: { width: 35, height: 35, resizeMode: 'contain' },
  registerText: { textAlign: 'center', marginTop: 20, fontSize: 14 },
  registerLink: { color: COLORS.primary, fontWeight: '500' },
  errorText: { color: COLORS.error, fontSize: 12, marginBottom: 10 },
});

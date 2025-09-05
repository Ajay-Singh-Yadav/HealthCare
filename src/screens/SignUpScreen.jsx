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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

GoogleSignin.configure({
  webClientId:
    '555583208374-uler3lak1dorme2ipstvhrdggn5v35jd.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: false,
});

const COLORS = {
  primary: '#4A90E2',
  text: '#000',
  gray: '#A8A8A9',
  error: '#D93025',
  white: '#fff',
  border: '#E5E5E5',
};

// SignUp Schema
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9]+\.[a-z]{2,}$/,
      'Enter a valid email address',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const auth = getAuth();

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const mountedRef = useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const toggleSecureText = useCallback(() => setSecureText(prev => !prev), []);

  const handleSignUp = useCallback(
    async (values, { setSubmitting }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email.trim().toLowerCase(),
          values.password,
        );
        login(userCredential.user);
      } catch (error) {
        let message = 'Something went wrong. Please try again.';
        switch (error?.code) {
          case 'auth/email-already-in-use':
            message = 'That email address is already in use!';
            break;
          case 'auth/invalid-email':
            message = 'That email address is invalid!';
            break;
          case 'auth/weak-password':
            message = 'Password should be at least 6 characters.';
            break;
        }
        Alert.alert('Sign Up failed', message);
      } finally {
        if (mountedRef.current) setSubmitting(false);
      }
    },
    [login],
  );

  // Google Sign In
  const handleGoogleSignIn = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.idToken || userInfo?.data?.idToken;

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

      if (firebaseUserCredential.user) {
        login();
      }
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      setGoogleLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled sign up');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available or outdated.');
      } else {
        Alert.alert('Error', 'Unexpected error during sign-up.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>SIGNUP</Text>
          <Text style={styles.logo}>Healthcare</Text>

          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}
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
                {/* Email */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email Id</Text>
                  <View style={styles.inputBox}>
                    <Ionicons
                      name="mail-outline"
                      size={moderateScale(20)}
                      color="#000"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputBox}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={moderateScale(20)}
                      color="#000"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Password"
                      secureTextEntry={secureText}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    <Pressable onPress={toggleSecureText}>
                      <Ionicons
                        name={secureText ? 'eye-off' : 'eye'}
                        size={moderateScale(20)}
                        color="#999"
                      />
                    </Pressable>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* Confirm Password */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputBox}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={moderateScale(20)}
                      color="#000"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      secureTextEntry={secureText}
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                    />
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                {/* Signup Button */}
                <Pressable
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>REGISTER</Text>
                  )}
                </Pressable>

                {/* Redirect */}
                <Text style={styles.footerText}>
                  Already Have an Account?{' '}
                  <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('LogIn')}
                  >
                    Click here to login
                  </Text>
                </Text>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(SignUpScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: moderateScale(20) },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  title: {
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginTop: verticalScale(20),
  },
  logo: {
    textAlign: 'center',
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    marginVertical: verticalScale(30),
  },
  inputContainer: { marginBottom: verticalScale(15) },
  label: {
    marginLeft: scale(10),
    marginBottom: verticalScale(5),
    fontWeight: '600',
    color: '#000',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
  },
  icon: { marginRight: scale(10) },
  input: { flex: 1, fontSize: moderateScale(14) },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(20),
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: moderateScale(14),
  },
  link: { color: 'blue', fontWeight: '600' },
  errorText: {
    color: COLORS.error,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    marginLeft: scale(4),
  },
  orText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: moderateScale(12),
    color: COLORS.gray,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  socialBtn: {
    borderRadius: moderateScale(60),
    borderWidth: 1,
    padding: moderateScale(8),
    borderColor: COLORS.primary,
    alignItems: 'center',
    marginHorizontal: scale(8),
  },
  socialIcon: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
  },
});

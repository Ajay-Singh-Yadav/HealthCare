// import React, { useContext, useState, useCallback, memo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from '@react-native-firebase/auth';

// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../navigation/AuthContext';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// // --- Configure once, outside component
// GoogleSignin.configure({
//   webClientId:
//     '555583208374-uler3lak1dorme2ipstvhrdggn5v35jd.apps.googleusercontent.com',
// });

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'At least 6 characters')
//     .required('Password is required'),
// });

// const SocialButton = memo(({ onPress, loading, iconSource }) => (
//   <TouchableOpacity
//     style={styles.GoogleButton}
//     onPress={onPress}
//     disabled={loading}
//     activeOpacity={0.8}
//   >
//     <View style={styles.googleContent}>
//       {loading ? (
//         <ActivityIndicator color="#F83758" size="small" />
//       ) : (
//         <Image source={iconSource} style={styles.googleImage} />
//       )}
//     </View>
//   </TouchableOpacity>
// ));

// const LogInScreen = () => {
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const [secureText, setSecureText] = useState(true);

//   const navigation = useNavigation();
//   const { login } = useContext(AuthContext);
//   const auth = getAuth();

//   // --- Memoized email login
//   const handleLogIn = useCallback(
//     async (values, { setSubmitting }) => {
//       try {
//         await auth.signInWithEmailAndPassword(values.email, values.password);
//         login();
//       } catch (error) {
//         let message = 'An error occurred. Please try again.';
//         if (error.code === 'auth/user-not-found')
//           message = 'No user found for that email.';
//         else if (error.code === 'auth/wrong-password')
//           message = 'Incorrect password.';
//         Alert.alert('Error', message);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//     [auth, login],
//   );

//   // --- Memoized Google login
//   const handleGoogleSignIn = useCallback(async () => {
//     setGoogleLoading(true);
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       const idToken = userInfo?.idToken;
//       if (!idToken) {
//         Alert.alert('Error', 'Failed to retrieve ID token.');
//         return;
//       }
//       const googleCredential = GoogleAuthProvider.credential(idToken);
//       const firebaseUserCredential = await signInWithCredential(
//         auth,
//         googleCredential,
//       );
//       if (firebaseUserCredential.user) login();
//     } catch (error) {
//       let message = 'An unexpected error occurred during sign-in.';
//       if (error.code === statusCodes.SIGN_IN_CANCELLED)
//         message = 'You cancelled the login process.';
//       else if (error.code === statusCodes.IN_PROGRESS)
//         message = 'Sign in is already in progress.';
//       else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
//         message = 'Google Play Services not available or outdated.';
//       Alert.alert('Info', message);
//     } finally {
//       setGoogleLoading(false);
//     }
//   }, [auth, login]);

//   const toggleSecureText = useCallback(() => {
//     setSecureText(prev => !prev);
//   }, []);

//   const LoginButton = memo(({ onPress, loading }) => (
//     <TouchableOpacity
//       style={styles.LoginButton}
//       onPress={onPress}
//       disabled={loading}
//     >
//       {loading ? (
//         <ActivityIndicator color="#fff" style={{ alignItems: 'center' }} />
//       ) : (
//         <Text style={styles.LoginText}>Login</Text>
//       )}
//     </TouchableOpacity>
//   ));

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={verticalScale(20)}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={styles.title}>Welcome</Text>
//           <Text style={[styles.title, { marginBottom: verticalScale(20) }]}>
//             Back!
//           </Text>

//           <Formik
//             initialValues={{ email: '', password: '' }}
//             validationSchema={LoginSchema}
//             onSubmit={handleLogIn}
//           >
//             {({
//               handleChange,
//               handleBlur,
//               handleSubmit,
//               values,
//               errors,
//               touched,
//               isSubmitting,
//             }) => (
//               <>
//                 {/* Email Input */}
//                 <View style={styles.MainTextInputContainer}>
//                   <View style={styles.inputContainer}>
//                     <Ionicons
//                       name="person"
//                       size={moderateScale(20)}
//                       color="#626262"
//                     />
//                     <TextInput
//                       placeholder="Username or Email"
//                       value={values.email}
//                       onChangeText={handleChange('email')}
//                       onBlur={handleBlur('email')}
//                       style={styles.inputText}
//                       placeholderTextColor="#A8A8A9"
//                       autoCapitalize="none"
//                       keyboardType="email-address"
//                     />
//                   </View>

//                   {touched.email && errors.email && (
//                     <Text style={styles.errorText}>{errors.email}</Text>
//                   )}
//                 </View>

//                 {/* Password Input */}
//                 <View style={styles.MainTextInputContainer}>
//                   <View
//                     style={[
//                       styles.inputContainer,
//                       { justifyContent: 'space-between' },
//                     ]}
//                   >
//                     <View style={styles.childInputContainer1}>
//                       <Entypo
//                         name="lock"
//                         size={moderateScale(20)}
//                         color="#626262"
//                       />
//                       <TextInput
//                         placeholder="Password"
//                         value={values.password}
//                         onChangeText={handleChange('password')}
//                         onBlur={handleBlur('password')}
//                         style={styles.inputText}
//                         placeholderTextColor="#A8A8A9"
//                         secureTextEntry={secureText}
//                       />
//                     </View>
//                     <TouchableOpacity
//                       style={styles.childInputContainer2}
//                       onPress={toggleSecureText}
//                     >
//                       <Ionicons
//                         name={secureText ? 'eye-off' : 'eye'}
//                         size={moderateScale(20)}
//                         color="#626262"
//                       />
//                     </TouchableOpacity>
//                   </View>
//                   {touched.password && errors.password && (
//                     <Text style={styles.errorText}>{errors.password}</Text>
//                   )}
//                 </View>

//                 <TouchableOpacity>
//                   <Text style={styles.ForgetPassword}>Forget Password ?</Text>
//                 </TouchableOpacity>
//                 <LoginButton onPress={handleSubmit} loading={isSubmitting} />
//               </>
//             )}
//           </Formik>

//           <Text style={styles.orText}>-or Continue with-</Text>

//           {/* Social Login */}
//           <View style={styles.LoginOptionsContainer}>
//             <SocialButton
//               onPress={handleGoogleSignIn}
//               loading={googleLoading}
//               iconSource={require('../assets/images/Google2.png')}
//             />
//             <SocialButton
//               iconSource={require('../assets/images/facebook2.png')}
//             />
//             <SocialButton iconSource={require('../assets/images/apple.png')} />
//           </View>

//           <Text style={styles.CreateAccountText}>
//             Create an Account{' '}
//             <Text
//               onPress={() => navigation.navigate('SignUp')}
//               style={styles.SignUpText}
//             >
//               Sign Up
//             </Text>
//           </Text>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LogInScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: moderateScale(15),
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingBottom: verticalScale(30),
//   },
//   title: {
//     fontSize: moderateScale(36),
//     fontFamily: 'Montserrat-Bold',
//     height: moderateScale(40),
//   },
//   MainTextInputContainer: {
//     marginBottom: verticalScale(10),
//     height: verticalScale(60),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: moderateScale(10),
//     padding: moderateScale(5),
//     backgroundColor: '#F3F3F3',
//     borderColor: '#A8A8A9',
//     marginBottom: verticalScale(3),
//   },
//   childInputContainer1: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   childInputContainer2: {
//     marginRight: scale(8),
//   },
//   inputText: {
//     marginLeft: moderateScale(5),
//     fontSize: moderateScale(12),
//     fontFamily: 'Montserrat-Medium',
//     color: '#000',
//     width: scale(260),
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginLeft: scale(5),
//   },
//   ForgetPassword: {
//     fontSize: moderateScale(12),
//     fontFamily: 'Montserrat-Regular',
//     color: '#F83758',
//     marginTop: moderateScale(5),
//     textAlign: 'right',
//     marginRight: scale(5),
//   },
//   LoginButton: {
//     height: verticalScale(40),
//     backgroundColor: '#F83758',
//     padding: moderateScale(12),
//     borderRadius: moderateScale(10),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: verticalScale(20),
//   },
//   LoginText: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   orText: {
//     fontSize: moderateScale(12),
//     fontFamily: 'Montserrat-Regular',
//     color: '#A8A8A9',
//     marginTop: moderateScale(60),
//     textAlign: 'center',
//   },
//   LoginOptionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: verticalScale(30),
//     gap: scale(20),
//   },
//   GoogleButton: {
//     borderRadius: moderateScale(60),
//     borderWidth: 1,
//     padding: moderateScale(8),
//     borderColor: '#F83758',
//     alignItems: 'center',
//   },
//   googleContent: {
//     width: moderateScale(35),
//     height: moderateScale(35),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   googleImage: {
//     width: moderateScale(35),
//     height: moderateScale(35),
//     resizeMode: 'contain',
//   },
//   CreateAccountText: {
//     textAlign: 'center',
//     fontSize: moderateScale(12),
//     fontFamily: 'Montserrat-Regular',
//     marginTop: verticalScale(30),
//   },
//   SignUpText: {
//     color: '#F83758',
//     fontSize: moderateScale(12),
//     fontFamily: 'Montserrat-SemiBold',
//     textDecorationLine: 'underline',
//     textDecorationColor: '#F83758',
//   },
// });

// src/screens/LogInScreen.jsx
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
import Entypo from 'react-native-vector-icons/Entypo';
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

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// --- Prefer configuring once at app bootstrap (e.g., App.tsx or a config module)
GoogleSignin.configure({
  webClientId:
    '555583208374-uler3lak1dorme2ipstvhrdggn5v35jd.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: false,
});

// ---------- Constants
const COLORS = {
  primary: '#F83758',
  text: '#000',
  subtext: '#626262',
  gray: '#A8A8A9',
  bgInput: '#F3F3F3',
  error: '#D93025',
  white: '#fff',
  border: '#E5E5E5',
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .transform(v => (v ? v.trim().toLowerCase() : v))
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'At least 6 characters')
    .required('Password is required'),
});

// ---------- Reusable memoized components
const SocialButton = memo(({ onPress, loading, iconSource, testID }) => (
  <Pressable
    style={styles.socialBtn}
    onPress={onPress}
    disabled={loading || !onPress}
    accessibilityRole="button"
    accessibilityHint="Continue with social provider"
    testID={testID}
  >
    <View style={styles.socialInner}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Image source={iconSource} style={styles.socialIcon} />
      )}
    </View>
  </Pressable>
));

const LoginButton = memo(({ onPress, loading }) => (
  <Pressable
    style={[styles.ctaBtn, loading && styles.ctaBtnDisabled]}
    onPress={onPress}
    disabled={loading}
    accessibilityRole="button"
    accessibilityHint="Submit your email and password to login"
    testID="loginButton"
  >
    {loading ? (
      <ActivityIndicator color={COLORS.white} />
    ) : (
      <Text style={styles.ctaText}>Login</Text>
    )}
  </Pressable>
));

// ---------- Screen

const auth = getAuth();

const LogInScreen = () => {
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

  const handleLogIn = useCallback(
    async (values, { setSubmitting }) => {
      try {
        await auth().signInWithEmailAndPassword(
          values.email.trim().toLowerCase(),
          values.password,
        );
        login();
      } catch (error) {
        // Map Firebase auth error codes
        let message = 'Something went wrong. Please try again.';
        switch (error?.code) {
          case 'auth/invalid-email':
            message = 'Email address is not valid.';
            break;
          case 'auth/user-disabled':
            message = 'This account has been disabled.';
            break;
          case 'auth/user-not-found':
            message = 'No user found for that email.';
            break;
          case 'auth/wrong-password':
            message = 'Incorrect password.';
            break;
          case 'auth/network-request-failed':
            message = 'Network error. Check your connection.';
            break;
        }
        Alert.alert('Login failed', message);
      } finally {
        if (mountedRef.current) setSubmitting(false);
      }
    },
    [login],
  );

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
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={verticalScale(20)}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Welcome</Text>
          <Text style={[styles.title, { marginBottom: verticalScale(20) }]}>
            Back!
          </Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            validateOnBlur
            validateOnChange={false}
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
                {/* Email */}
                <View style={styles.fieldWrap}>
                  <View style={styles.inputRow}>
                    <Ionicons
                      name="person"
                      size={moderateScale(20)}
                      color={COLORS.subtext}
                    />
                    <TextInput
                      placeholder="Username or Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      style={styles.input}
                      returnKeyType="next"
                      textContentType="username"
                      testID="emailInput"
                      onSubmitEditing={() => {
                        // focus password via ref if you add one
                      }}
                    />
                  </View>
                  {!!(touched.email && errors.email) && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Password */}
                <View style={styles.fieldWrap}>
                  <View style={styles.inputRow}>
                    <View style={styles.inlineRow}>
                      <Entypo
                        name="lock"
                        size={moderateScale(20)}
                        color={COLORS.subtext}
                      />
                      <TextInput
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholderTextColor={COLORS.gray}
                        secureTextEntry={secureText}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        returnKeyType="go"
                        textContentType="password"
                        testID="passwordInput"
                        onSubmitEditing={handleSubmit}
                      />
                    </View>

                    <Pressable
                      hitSlop={8}
                      onPress={toggleSecureText}
                      accessibilityRole="button"
                      accessibilityLabel={
                        secureText ? 'Show password' : 'Hide password'
                      }
                      style={styles.eyeBtn}
                      testID="togglePassword"
                    >
                      <Ionicons
                        name={secureText ? 'eye-off' : 'eye'}
                        size={moderateScale(20)}
                        color={COLORS.subtext}
                      />
                    </Pressable>
                  </View>
                  {!!(touched.password && errors.password) && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <Pressable
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={styles.forgotWrap}
                  accessibilityRole="button"
                  testID="forgotPassword"
                >
                  <Text style={styles.forgotText}>Forget Password ?</Text>
                </Pressable>

                <LoginButton onPress={handleSubmit} loading={isSubmitting} />
              </>
            )}
          </Formik>

          <Text style={styles.orText}>-or Continue with-</Text>

          {/* Social */}
          <View style={styles.socialRow}>
            <SocialButton
              onPress={handleGoogleSignIn}
              loading={googleLoading}
              iconSource={require('../assets/images/Google2.png')}
              testID="googleButton"
            />
            <SocialButton
              iconSource={require('../assets/images/facebook2.png')}
              testID="facebookButton"
            />
            <SocialButton
              iconSource={require('../assets/images/apple.png')}
              testID="appleButton"
            />
          </View>

          <Text style={styles.signupLine}>
            Create an Account{' '}
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signupLink}
            >
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogInScreen;

// ---------- Styles
const styles = StyleSheet.create({
  flex1: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: moderateScale(15),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(36),
    fontFamily: 'Montserrat-Bold',
    height: moderateScale(40),
    color: COLORS.text,
  },
  fieldWrap: {
    marginBottom: verticalScale(10),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    backgroundColor: COLORS.bgInput,
    borderColor: COLORS.gray,
    minHeight: verticalScale(48),
    justifyContent: 'space-between',
  },
  inlineRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  input: {
    marginLeft: moderateScale(8),
    fontSize: moderateScale(14),
    fontFamily: 'Montserrat-Medium',
    color: COLORS.text,
    flex: 1,
    paddingVertical: Platform.select({ ios: 12, android: 8 }),
  },
  eyeBtn: {
    padding: moderateScale(6),
    marginLeft: scale(8),
  },
  errorText: {
    color: COLORS.error,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    marginLeft: scale(4),
  },
  forgotWrap: { alignSelf: 'flex-end', marginTop: verticalScale(6) },
  forgotText: {
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    color: COLORS.primary,
  },
  ctaBtn: {
    height: verticalScale(44),
    backgroundColor: COLORS.primary,
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },
  ctaBtnDisabled: { opacity: 0.7 },
  ctaText: {
    color: COLORS.white,
    fontSize: moderateScale(18),
    fontFamily: 'Montserrat-SemiBold',
  },
  orText: {
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    color: COLORS.gray,
    marginTop: verticalScale(40),
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(24),
    gap: scale(20),
  },
  socialBtn: {
    borderRadius: moderateScale(60),
    borderWidth: 1,
    padding: moderateScale(8),
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  socialInner: {
    width: moderateScale(35),
    height: moderateScale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
  },
  signupLine: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    marginTop: verticalScale(28),
    color: COLORS.text,
  },
  signupLink: {
    color: COLORS.primary,
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-SemiBold',
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.primary,
  },
});

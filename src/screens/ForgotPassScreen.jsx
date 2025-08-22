import React, { useRef, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const COLORS = {
  primary: '#F83758',
  text: '#000',
  subtext: '#626262',
  massage: '#676767',
  gray: '#A8A8A9',
  bgInput: '#F3F3F3',
  error: '#D93025',
  white: '#fff',
  border: '#E5E5E5',
};

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
});

// Submit Button
const SubmitButton = memo(({ onPress, loading }) => (
  <Pressable
    style={[styles.ctaBtn, loading && styles.ctaBtnDisabled]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color={COLORS.white} />
    ) : (
      <Text style={styles.ctaText}>Submit</Text>
    )}
  </Pressable>
));

const auth = getAuth();

const ForgetPassScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = useCallback(async email => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      Alert.alert(
        'Password Reset',
        'A reset link has been sent to your email.',
      );
    } catch (error) {
      let message = 'Something went wrong. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'That email address is invalid.';
          break;
        case 'auth/user-not-found':
          message = 'No account found with this email.';
          break;
      }
      Alert.alert('Reset Failed', message);
    } finally {
      setLoading(false);
    }
  }, []);

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
          <Text style={styles.title}>Forgot</Text>
          <Text style={[styles.title, { marginBottom: verticalScale(20) }]}>
            password?
          </Text>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={LoginSchema}
            validateOnBlur
            validateOnChange={false}
            onSubmit={({ email }) => handleForgotPassword(email)}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              handleSubmit,
            }) => (
              <>
                {/* Email Field */}
                <View style={styles.fieldWrap}>
                  <View style={styles.inputRow}>
                    <Ionicons
                      name="mail"
                      size={moderateScale(20)}
                      color={COLORS.subtext}
                    />
                    <TextInput
                      placeholder="Email Address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      style={styles.input}
                      returnKeyType="done"
                      textContentType="emailAddress"
                    />
                  </View>
                  {!!(touched.email && errors.email) && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <Text style={styles.subtext}>
                  <Text style={{ color: COLORS.primary }}>*</Text> We will send
                  you a message to set or reset your new password
                </Text>

                {/* Submit Button */}
                <SubmitButton onPress={handleSubmit} loading={loading} />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ForgetPassScreen);

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
    justifyContent: 'flex-start',
    paddingTop: verticalScale(40),
  },
  title: {
    fontSize: moderateScale(36),
    fontFamily: 'Montserrat-Bold',
    color: COLORS.text,
    lineHeight: moderateScale(40),
  },
  subtext: {
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    color: COLORS.massage,
    marginBottom: verticalScale(15),
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
    minHeight: verticalScale(44),
  },
  input: {
    marginLeft: moderateScale(8),
    fontSize: moderateScale(14),
    fontFamily: 'Montserrat-Medium',
    color: COLORS.text,
    flex: 1,
    paddingVertical: Platform.select({ ios: 12, android: 8 }),
  },
  errorText: {
    color: COLORS.error,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    marginLeft: scale(4),
  },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(10),
  },
  ctaBtnDisabled: {
    opacity: 0.7,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontFamily: 'Montserrat-SemiBold',
  },
});

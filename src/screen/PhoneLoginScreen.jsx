import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import useLogInStyle from '../hooks/useLogInStyle';

import InputField from '../components/InputField';
import Sizes from '../utils/responsive';

const PhoneLoginScreen = () => {
  const styles = useLogInStyle();
  const navigation = useNavigation();

  const [confirm, setConfirm] = useState(null); // confirmation object
  const [codeSent, setCodeSent] = useState(false); // toggle UI after sending OTP

  // Yup validation
  const PhoneSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(/^\+91\d{10}$/, 'Phone number must be in +91XXXXXXXXXX format')
      .required('Phone number is required'),
    code: Yup.string().when('codeSent', {
      is: true,
      then: Yup.string()
        .length(6, 'OTP must be 6 digits')
        .required('Enter the OTP sent to your phone'),
    }),
  });

  // Send OTP
  const handleSendOTP = async (values, setSubmitting, setFieldError) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(values.phone);
      setConfirm(confirmation);
      setCodeSent(true);
      Alert.alert('OTP Sent', 'Please check your phone.');
    } catch (error) {
      console.log('OTP send error:', error);
      setFieldError('phone', 'Failed to send OTP');
    } finally {
      setSubmitting(false);
    }
  };

  // Confirm OTP
  const handleVerifyCode = async (values, setSubmitting, setFieldError) => {
    try {
      await confirm.confirm(values.code);
      await auth().currentUser.updateProfile({
        displayName: values.name,
      });
      Alert.alert('Success', 'You are logged in!');
      navigation.replace('Home');
    } catch (error) {
      console.log('OTP verify error:', error);
      setFieldError('code', 'Invalid OTP');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/revenue-i2.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Sign In with Mobile</Text>
      </View>

      <Formik
        initialValues={{ name: '', phone: '', code: '' }}
        validationSchema={PhoneSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          if (!codeSent) {
            handleSendOTP(values, setSubmitting, setFieldError);
          } else {
            handleVerifyCode(values, setSubmitting, setFieldError);
          }
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            {/* Phone Number Field (always show) */}
            <View
              style={[styles.inputContainer, { marginTop: Sizes.scale(10) }]}
            >
              <InputField
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Enter your name"
                icon="person-outline"
                iconLib="Ionicons"
              />

              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <View
              style={[
                styles.inputContainer,
                { marginVertical: Sizes.scale(30) },
              ]}
            >
              <InputField
                value={values.phone}
                onChangeText={handleChange('phone')}
                placeholder="+91XXXXXXXXXX"
                keyboardType="phone-pad"
                icon="phone-portrait-outline"
                iconLib="Ionicons"
              />

              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <View
              style={[styles.inputContainer, { marginBottom: Sizes.scale(25) }]}
            >
              <InputField
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="phone-pad"
                value={values.code}
                onChangeText={handleChange('code')}
                maxLength={6}
                icon="message-square"
                iconLib="Feather"
              />
              {touched.code && errors.code && (
                <Text style={styles.errorText}>{errors.code}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.signInButton}
              disabled={isSubmitting}
            >
              <Text style={styles.signInButtonText}>
                {isSubmitting
                  ? codeSent
                    ? 'Verifying...'
                    : 'Sending OTP...'
                  : codeSent
                  ? 'Verify OTP'
                  : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default PhoneLoginScreen;

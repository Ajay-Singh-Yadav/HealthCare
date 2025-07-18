import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import InputField from '../components/InputField';
import { useNavigation } from '@react-navigation/native';
import useLogInStyle from '../hooks/useLogInStyle';

import { getAuth } from '@react-native-firebase/auth';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpScreen = () => {
  const styles = useLogInStyle();
  const navigation = useNavigation();
  const auth = getAuth();

  const [user, setUser] = useState('');

  const handleSignUp = async (values, { setSubmitting, setErrors }) => {
    const { email, password } = values;

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('Home');
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
          source={require('../assets/images/revenue-i4.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Create an account !</Text>
      </View>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <InputField
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Enter your name"
                keyboardType="default"
                icon="person-outline"
              />
              <Text style={styles.errorText}>
                {touched.name && errors.name ? errors.name : ' '}
              </Text>
            </View>
            <View style={[styles.inputContainer]}>
              <InputField
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter your email"
                keyboardType="email-address"
                icon="mail-outline"
              />
              <Text style={styles.errorText}>
                {touched.email && errors.email ? errors.email : ' '}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <InputField
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter your password"
                secureTextEntry
                icon="lock-closed-outline"
              />
              <Text style={styles.errorText}>
                {touched.password && errors.password ? errors.password : ' '}
              </Text>
            </View>
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordButtonText}>
                Forgot Password? ;
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.signInButtonText}>
                {isSubmitting ? 'Signing up...' : 'SignUp'}
              </Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      {/* LogIn Options */}
      <View style={styles.LoginOptions}>
        <TouchableOpacity style={styles.mobileButton}>
          <Ionicons name="phone-portrait-outline" size={30} color="#000" />
          <Text style={styles.mobileButtonText}>Mobile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mobileButton}>
          <Image
            source={require('../assets/icons/Google.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.mobileButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mobileButton}>
          <Image
            source={require('../assets/icons/facebook.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.mobileButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Image,
//   View,
//   Alert,
// } from 'react-native';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   webClientId:
//     '555583208374-uler3lak1dorme2ipstvhrdggn5v35jd.apps.googleusercontent.com',
// });

// const App = () => {
//   const auth = getAuth();

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();

//       await GoogleSignin.signOut();

//       const userInfo = await GoogleSignin.signIn();
//       const idToken = userInfo?.idToken || userInfo?.data?.idToken;
//       console.log('ID Token:', idToken);

//       if (!idToken) {
//         Alert.alert('Error', 'Failed to retrieve ID token.');
//         return;
//       }

//       const googleCredential = GoogleAuthProvider.credential(idToken);
//       const firebaseUserCredential = await signInWithCredential(
//         auth,
//         googleCredential,
//       );

//       const user = firebaseUserCredential.user;

//       if (user) {
//         Alert.alert('Sign-In Success', ` Welcome, ${user.displayName}!`, [
//           { text: 'OK' },
//         ]);
//       } else {
//         Alert.alert('Error', 'Firebase authentication failed.');
//       }
//     } catch (error) {
//       console.log('Sign-In Error:', error);

//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('User cancelled the login flow');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('Sign in is in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         Alert.alert('Error', 'Google Play Services not available or outdated.');
//       } else {
//         Alert.alert('Error', 'An unexpected error occurred during sign-in.');
//       }
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.button} onPress={signIn}>
//       <View style={styles.buttonContent}>
//         {/* <Image
//           source={require('../../../assets/icons/Google.png')} // Adjust path as needed
//           style={styles.logo}
//         /> */}
//         <Text style={styles.buttonText}>Continue with Google</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     width: '90%',
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 2,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 15,
//     backgroundColor: 'white',
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 24,
//     height: 24,
//     marginRight: 15,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default App;

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const App = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [confirm, setConfirm] = useState(null);
//   const [code, setCode] = useState('');

//   // Step 1: Send verification code
//   const signInWithPhoneNumber = async () => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       setConfirm(confirmation);
//       Alert.alert('Code Sent', 'Please enter the verification code.');
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Error', error.message);
//     }
//   };

//   // Step 2: Confirm code
//   const confirmCode = async () => {
//     try {
//       await confirm.confirm(code);
//       Alert.alert('Login Success', 'You are now signed in!');
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Invalid Code', 'The code you entered is invalid.');
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       {!confirm ? (
//         <>
//           <Text>Enter Phone Number:</Text>
//           <TextInput
//             placeholder="+91xxxxxxxxxx"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             keyboardType="phone-pad"
//             style={{ borderBottomWidth: 1, marginBottom: 20 }}
//           />
//           <Button title="Send Code" onPress={signInWithPhoneNumber} />
//         </>
//       ) : (
//         <>
//           <Text>Enter Verification Code:</Text>
//           <TextInput
//             placeholder="123456"
//             value={code}
//             onChangeText={setCode}
//             keyboardType="number-pad"
//             style={{ borderBottomWidth: 1, marginBottom: 20 }}
//           />
//           <Button title="Verify Code" onPress={confirmCode} />
//         </>
//       )}
//     </View>
//   );
// };

// export default App;

import { StatusBar } from 'react-native';
import React from 'react';

import { ThemeProvider } from './src/context/ThemeContext';

import AppNavigation from './src/navigator/AppNavigation';

import { store } from './src/redux/store';
import ApolloClientProvider from './src/Graphql/ApolloClientProvider';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />

      <Provider store={store}>
        <ApolloClientProvider>
          <ThemeProvider>
            <AppNavigation />
          </ThemeProvider>
        </ApolloClientProvider>
      </Provider>
    </>
  );
};

export default App;

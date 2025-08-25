import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'This method is deprecated (as well as all React Native Firebase namespaced API)',
]);

import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import ApolloClientProvider from './src/graphql/ApolloClientProvider';
import { AuthProvider } from './src/navigation/AuthContext';

import { ThemeProvider } from './src/constants/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ApolloClientProvider>
          <AppNavigation />
        </ApolloClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'This method is deprecated (as well as all React Native Firebase namespaced API)',
]);

import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';

import { AuthProvider } from './src/navigation/AuthContext';
import { Provider } from 'react-redux';

import { ThemeProvider } from './src/constants/ThemeContext';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

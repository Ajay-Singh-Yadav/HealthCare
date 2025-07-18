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

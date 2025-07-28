import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import ApolloClientProvider from './src/graphql/ApolloClientProvider';
import { AuthProvider } from './src/navigation/AuthContext';

import { WalletProvider } from './src/constants/WalletContext';

const App = () => {
  return (
    <WalletProvider>
      <AuthProvider>
        <ApolloClientProvider>
          <AppNavigation />
        </ApolloClientProvider>
      </AuthProvider>
    </WalletProvider>
  );
};

export default App;

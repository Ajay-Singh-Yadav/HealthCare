import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import ApolloClientProvider from './src/graphql/ApolloClientProvider';
import { AuthProvider } from './src/navigation/AuthContext';

import { WalletProvider } from './src/constants/WalletContext';
import { RefetchProvider } from './src/constants/RefetchContext';

const App = () => {
  return (
    <RefetchProvider>
      <WalletProvider>
        <AuthProvider>
          <ApolloClientProvider>
            <AppNavigation />
          </ApolloClientProvider>
        </AuthProvider>
      </WalletProvider>
    </RefetchProvider>
  );
};

export default App;

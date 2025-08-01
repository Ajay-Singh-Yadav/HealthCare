import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const savedWallets = await AsyncStorage.getItem('wallets');
        if (savedWallets !== null) {
          setWallets(JSON.parse(savedWallets));
        }
      } catch (e) {
        console.error('Failed to load wallets:', e);
      }
    };
    loadWallets();
  }, []);

  const savedWallets = async newWallets => {
    try {
      await AsyncStorage.setItem('wallets', JSON.stringify(newWallets));
    } catch (e) {
      console.error('Failed to save wallets:', e);
    }
  };

  const addWallet = walletName => {
    const newWallet = { label: walletName, value: walletName };
    const updated = [newWallet, ...wallets];
    setWallets(updated);
    savedWallets(updated);
  };

  const editWallet = (oldName, newName) => {
    const updatedWallets = wallets.map(wallet =>
      wallet.value === oldName ? { label: newName, value: newName } : wallet,
    );
    setWallets(updatedWallets);
    savedWallets(updatedWallets);
  };

  return (
    <WalletContext.Provider value={{ wallets, addWallet, editWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

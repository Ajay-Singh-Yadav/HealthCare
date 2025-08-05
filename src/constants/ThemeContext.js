import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../constants/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeKey, setThemeKey] = useState('dark');
  const [theme, setTheme] = useState(Themes.dark);
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme && Themes[storedTheme]) {
        setThemeKey(storedTheme);
        setTheme(Themes[storedTheme]);
      } else {
        setThemeKey('dark');
        setTheme(Themes.dark);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async key => {
    if (Themes[key]) {
      setThemeKey(key);
      setTheme(Themes[key]);
      await AsyncStorage.setItem('appTheme', key);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeKey, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

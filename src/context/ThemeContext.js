import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the ThemeContext
const ThemeContext = createContext();

const loadThemeByKey = async key => {
  switch (key) {
    case 'coffee':
      return (await import('../themes/coffee')).default;
    case 'dark':
      return (await import('../themes/dark')).default;
    case 'forest':
      return (await import('../themes/forest')).default;
    case 'purple':
      return (await import('../themes/purple')).default;
    case 'ocean':
      return (await import('../themes/ocean')).default;
    default:
      return (await import('../themes/coffee')).default;
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(require('../themes/coffee').default);
  const [currentTheme, setCurrentTheme] = useState('coffee');
  const [isLoading, setIsLoading] = useState(true);

  const changeTheme = async key => {
    setIsLoading(true);
    const newTheme = await loadThemeByKey(key);
    setTheme(newTheme);
    setCurrentTheme(key);
    await AsyncStorage.setItem('appTheme', key);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      const themeKey = savedTheme || 'coffee';
      const loadedTheme = await loadThemeByKey(themeKey);
      setTheme(loadedTheme);
      setCurrentTheme(themeKey);
      setIsLoading(false);
    })();
  }, []);

  const value = useMemo(
    () => ({
      theme,
      currentTheme,
      setTheme: changeTheme,
      isLoading,
    }),
    [theme, currentTheme, isLoading],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

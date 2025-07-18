import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useTheme();

  const themes = ['coffee', 'forest', 'purple', 'ocean'];

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {themes.map(themeKey => (
        <Button
          key={themeKey}
          title={themeKey}
          onPress={() => setTheme(themeKey)}
          disabled={currentTheme === themeKey}
        />
      ))}
    </View>
  );
};

export default ThemeSwitcher;

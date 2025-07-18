import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useInputStyle = () => {
  const { theme } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: Sizes.scale(14),
        },
        inputWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.white,
          borderRadius: Sizes.scale(12),
          paddingHorizontal: Sizes.scale(8),
          paddingVertical: Platform.OS === 'android' ? 4 : 0,
          borderWidth: 1,
          borderColor: theme.border,
        },
        icon: {
          marginRight: Sizes.scale(5),
        },
        input: {
          flex: 1,
          fontSize: Sizes.fontSM,
          color: theme.text,
          paddingVertical: Sizes.verticalScale(6),
        },
      }),
    [theme],
  );
};

export default useInputStyle;

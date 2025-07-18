import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useSplash = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        mainContaoiner: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        lottie: {
          width: Sizes.screenWidth,
          height: Sizes.screenHeight * 0.5,
        },
      }),
    [theme],
  );

  return styles;
};

export default useSplash;

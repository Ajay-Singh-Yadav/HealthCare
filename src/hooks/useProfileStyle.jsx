import { StyleSheet, useWindowDimensions } from 'react-native';

import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useProfileStyle = () => {
  const { theme } = useTheme();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isportrait = width < height;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: Sizes.scale(16),
          paddingTop: Sizes.verticalScale(20),
          backgroundColor: theme.background,
        },
        headerContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Sizes.scale(10),
          marginBottom: Sizes.verticalScale(20),
        },
        header: {
          fontSize: Sizes.fontMD,
          fontWeight: '500',
        },
        profileContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 25,
        },
        avatar: {
          backgroundColor: '#d8d8d8',
          borderRadius: Sizes.scale(32),
          width: Sizes.scale(54),
          height: Sizes.scale(52),
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: Sizes.scale(10),
        },
        avatarText: {
          fontSize: Sizes.fontSM,
          fontWeight: '600',
          color: theme.text,
        },
        name: {
          fontSize: Sizes.fontSM,
          fontWeight: '700',
          color: theme.text,
        },
        number: {
          fontSize: Sizes.fontXS,
          color: theme.text,
        },
        sectionTitle: {
          fontWeight: '600',
          fontSize: Sizes.fontSM,
        },

        menuItem: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: Sizes.scale(10),
          marginHorizontal: Sizes.scale(5),
          gap: Sizes.scale(5),
        },
        menuContent: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Sizes.scale(5),
        },
        menuText: {
          color: theme.text,
        },
        sectionLabel: {
          marginTop: Sizes.verticalScale(20),
          marginBottom: Sizes.verticalScale(10),
          fontWeight: '600',
          fontSize: Sizes.fontSM,
          color: '#000',
        },
        logoutButton: {
          marginTop: Sizes.verticalScale(30),
          borderWidth: 1,
          borderColor: '#ccc',
          paddingVertical: Sizes.verticalScale(10),
          borderRadius: Sizes.scale(20),
          alignItems: 'center',
        },
        logoutText: {
          color: '#0b57d0',
          fontWeight: '600',
          fontSize: Sizes.fontSM,
        },
        version: {
          textAlign: 'center',
          marginTop: Sizes.verticalScale(20),

          color: theme.text,
        },
      }),
    [theme, width, height, isLandscape],
  );
};

export default useProfileStyle;

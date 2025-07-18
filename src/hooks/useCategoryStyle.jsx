import { StyleSheet, useWindowDimensions } from 'react-native';

import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useCategoryStyle = () => {
  const { theme } = useTheme();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isportrait = width < height;

  return useMemo(
    () =>
      StyleSheet.create({
        categoryContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.scale(5),
          marginTop: Sizes.verticalScale(15),
          gap: Sizes.scale(3),
        },
        categoryTitle: {
          fontSize: Sizes.fontSM,
          fontWeight: '500',
          color: theme.text,
        },

        category: {
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: Sizes.scale(40),
          padding: Sizes.scale(6),
          marginTop: Sizes.verticalScale(20),
          justifyContent: 'center',
          gap: Sizes.scale(7),
          alignItems: 'center',
        },
        categoryItem: {
          flexDirection: 'row',
          justifyContent: 'center',
        },

        categoryText: {
          fontSize: Sizes.fontXS,
          fontWeight: '400',
          color: theme.text,
        },
        gridContainer: {
          paddingHorizontal: Sizes.scale(5),
          paddingTop: Sizes.scale(10),
          backgroundColor: '#fff',
        },
        row: {
          gap: Sizes.scale(20),
          marginBottom: Sizes.scale(10),
        },
        caotegoryIcon: {
          marginLeft: Sizes.scale(5),
        },

        categoryBox: {
          borderWidth: 1,
          borderColor: theme.border,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#eee',
          paddingVertical: Sizes.scale(8),
          borderRadius: Sizes.scale(10),
          gap: Sizes.scale(6),
          elevation: 6,
          marginHorizontal: Sizes.scale(5),
          marginVertical: Sizes.scale(6),
        },
      }),
    [theme, width, height, isLandscape],
  );
};

export default useCategoryStyle;

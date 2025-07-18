import { StyleSheet, useWindowDimensions } from 'react-native';

import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useCardStyle = () => {
  const { theme } = useTheme();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return useMemo(
    () =>
      StyleSheet.create({
        sectionContainer: {
          marginTop: Sizes.verticalScale(10),
          alignItems: 'center',
        },
        card: {
          backgroundColor: theme.white,
          borderRadius: Sizes.scale(10),
          width: width * 0.9,

          height: isLandscape
            ? Sizes.verticalScale(150)
            : Sizes.verticalScale(150),

          padding: Sizes.scale(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        },
        cardTitle: {
          fontSize: Sizes.fontMD,
          fontWeight: '600',
        },
        cardValue: {
          fontSize: Sizes.fontXXXXL,
          fontWeight: '600',
        },
        IncomeExpense: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: Sizes.verticalScale(16),
          left: Sizes.scale(16),
          right: Sizes.scale(16),
        },
        Income: {},
        Expense: {},
        line: {
          width: 1,
          height: '70%',
          backgroundColor: '#000',
        },
        IncomeText: {
          fontSize: Sizes.fontSM,
          fontWeight: '400',
        },
        ExpenseText: {
          fontSize: Sizes.fontSM,
          fontWeight: '400',
        },
        amoutText: {
          fontSize: Sizes.fontLG,
          fontWeight: '500',
        },
      }),
    [theme, width],
  );
};

export default useCardStyle;

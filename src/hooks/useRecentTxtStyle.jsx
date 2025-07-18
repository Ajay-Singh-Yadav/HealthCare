import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useRecentTxtStyle = () => {
  const { theme } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginHorizontal: Sizes.scale(20),
          backgroundColor: theme.white,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: Sizes.scale(10),
          padding: Sizes.scale(10),
          marginTop: Sizes.verticalScale(10),
        },
        contentConatiner: {
          paddingBottom: 25,
        },
        recentIcon: {
          alignSelf: 'center',
        },
        LeftView: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          flex: 1,
        },
        rightView: {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: Sizes.scale(10),
          flexShrink: 0,
        },

        slaryView: {
          marginLeft: Sizes.scale(10),
          flex: 1,
        },

        salaryText: {
          fontSize: Sizes.fontSM,
          fontWeight: '500',
          color: theme.text,
          flexWrap: 'wrap',
        },
        amoutText: {
          fontSize: Sizes.fontSM,
          fontWeight: '500',
          color: theme.income,
        },
        datetext: {
          fontSize: Sizes.fontXXS,
          color: theme.text,
        },
        deleteIcon: {
          height: '100%',
          borderLeftWidth: 2,
          borderLeftColor: theme.border,
          marginLeft: Sizes.scale(10),
          height: Sizes.scale(40),
          justifyContent: 'center',
        },
        icon: {
          marginLeft: Sizes.scale(10),
        },
        categoryView: {
          marginTop: Sizes.verticalScale(2),
          flexDirection: 'row',
          gap: Sizes.scale(3),
          alignItems: 'center',
        },
      }),
    [theme],
  );
};

export default useRecentTxtStyle;

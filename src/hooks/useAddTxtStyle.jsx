import { StyleSheet, useWindowDimensions } from 'react-native';

import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useAddTxtStyle = () => {
  const { theme } = useTheme();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isportrait = width < height;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
        },
        header: {
          marginTop: Sizes.verticalScale(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: Sizes.scale(10),
        },
        backButton: {
          marginLeft: Sizes.scale(5),
        },
        title: {
          fontWeight: '500',
          fontSize: Sizes.fontSM,
          color: theme.text,
        },
        saveButton: {
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: Sizes.scale(5),
        },
        line: {
          marginTop: Sizes.verticalScale(10),
          height: 2,
          width: '100%',
          backgroundColor: theme.border,
        },
        // card Section
        cardContainer: {
          marginTop: Sizes.verticalScale(10),
          alignItems: 'center',
        },
        card: {
          backgroundColor: theme.white,
          borderRadius: Sizes.scale(10),
          width: isportrait ? width * 0.9 : width * 0.95,

          height: isLandscape
            ? Sizes.verticalScale(500)
            : Sizes.verticalScale(500),

          padding: Sizes.scale(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        },
        cardTitle: {
          fontSize: Sizes.fontSM,
          fontWeight: '500',
          color: theme.text,
        },

        InExContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: Sizes.scale(25),
        },
        InEx: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: Sizes.scale(30),
          padding: Sizes.scale(10),
          gap: 5,
        },

        selectedType: {
          backgroundColor: theme.primary,
        },
        inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.scale(5),
          marginTop: Sizes.verticalScale(10),
          borderBottomWidth: 2,
          borderColor: theme.border,
        },
        titleContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.scale(5),
          marginTop: Sizes.verticalScale(20),
          borderWidth: 2,
          borderRadius: Sizes.scale(5),
          borderColor: theme.border,
        },
        input: {
          flex: 1,
          fontSize: Sizes.fontXL,
          color: theme.text,
        },
        icon: {
          marginTop: Sizes.verticalScale(3),
        },
      }),
    [theme, width, height, isLandscape],
  );
};

export default useAddTxtStyle;

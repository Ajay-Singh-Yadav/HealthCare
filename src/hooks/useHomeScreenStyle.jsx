import { StyleSheet, Dimensions } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;

const useHomeScreenStyle = () => {
  const { theme } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
        },
        header: {
          marginTop: Sizes.verticalScale(30),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.scale(10),
        },
        image: {
          width: width * 0.15,
          height: height * 0.08,
          resizeMode: 'contain',
        },
        textContainer: {
          flex: 1,
          marginLeft: Sizes.scale(12),
        },
        welcomeText: {
          color: theme.text,
        },
        icon: {
          color: theme.text,
        },
        nameText: {
          fontSize: Sizes.fontSM,
          fontWeight: 'bold',
          color: theme.text,
        },
        rightHeader: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        addButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.primary,
          paddingHorizontal: Sizes.scale(10),
          paddingVertical: Sizes.verticalScale(5),
          borderRadius: Sizes.scale(20),
          marginRight: Sizes.scale(10),
        },
        addText: {
          color: theme.white,
          fontSize: Sizes.fontSM,
          fontWeight: 'bold',
          marginLeft: Sizes.scale(5),
        },
        logoutButton: {
          padding: Sizes.scale(5),
        },
        cardSectionText: {
          fontSize: Sizes.fontSM,
          fontWeight: 'bold',
          color: theme.text,
          marginLeft: Sizes.scale(10),
          marginTop: Sizes.verticalScale(10),
        },
        transactionContainer: {
          marginTop: Sizes.verticalScale(10),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: Sizes.scale(18),
        },
        transactionText: {
          fontSize: Sizes.fontMD,
          fontWeight: '500',
          color: theme.text,
          marginLeft: Sizes.scale(18),
        },
        settingButton: {
          alignSelf: 'flex-end',
          marginRight: Sizes.scale(15),
          marginTop: Sizes.verticalScale(5),
        },
        loaderContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        lottie: {
          width: isLandscape ? width * 0.3 : width * 0.5,
          height: isLandscape ? height * 0.3 : height * 0.5,
        },
      }),
    [theme],
  );
};

export default useHomeScreenStyle;

import { StyleSheet, Platform } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useLogInStyle = () => {
  const { theme } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        scrollContent: {
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: Sizes.scale(10),
          backgroundColor: theme.background,
        },
        logoContainer: {
          alignItems: 'center',
          marginBottom: Sizes.verticalScale(20),
        },
        image: {
          width: Sizes.screenWidth * 0.6,
          height: Sizes.screenHeight * 0.3,
          resizeMode: 'contain',
        },
        title: {
          fontSize: Sizes.scale(28),
          color: theme.text,
          fontWeight: '500',
          marginTop: Sizes.verticalScale(10),
          textAlign: 'center',
        },
        forgotPasswordButton: {
          alignItems: 'flex-end',
          marginHorizontal: Sizes.scale(15),
        },
        forgotPasswordButtonText: {
          color: theme.text,
          fontSize: Sizes.scale(9),
          fontWeight: '600',
          fontFamily: 'SpaceMono-Regular',
        },
        signInButton: {
          backgroundColor: theme.primary,
          marginTop: Sizes.verticalScale(20),
          paddingVertical: Sizes.verticalScale(8),
          marginHorizontal: Sizes.scale(20),
          borderRadius: Sizes.scale(6),
        },
        signInButtonText: {
          color: theme.white,
          textAlign: 'center',
          fontSize: Sizes.scale(18),
          fontWeight: '600',
          fontFamily: 'SpaceMono-Regular',
        },
        footerContainer: {
          marginTop: Sizes.verticalScale(20),
          flexDirection: 'row',
          justifyContent: 'center',
        },
        footerText: {
          color: theme.text,
          fontSize: Sizes.scale(12),
          fontFamily: 'SpaceMono-Regular',
        },
        linkText: {
          color: theme.primary,
          fontSize: Sizes.scale(12),
          marginLeft: Sizes.scale(5),
          fontWeight: '600',
          fontFamily: 'SpaceMono-Regular',
        },
        LoginOptions: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Sizes.verticalScale(20),
          gap: Sizes.scale(30),
          paddingVertical: Sizes.verticalScale(10),
        },
        mobileButton: {
          alignItems: 'center',
          gap: Sizes.scale(2),
        },
        mobileButtonText: {
          color: theme.text,
          fontSize: Sizes.scale(8),
          fontWeight: '600',
          fontFamily: 'SpaceMono-Regular',
        },
        googleIcon: {
          width: Sizes.scale(25),
          height: Sizes.scale(25),
          resizeMode: 'contain',
        },
        errorText: {
          color: 'red',
          fontSize: Sizes.scale(8),
          fontWeight: '400',
          marginLeft: Sizes.scale(25),
          minHeight: Sizes.verticalScale(20),
        },
      }),
    [theme],
  );
};

export default useLogInStyle;

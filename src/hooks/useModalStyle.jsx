import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

const useModalStyle = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
        modalView: {
          backgroundColor: '#fff',
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        modalTitle: {
          fontWeight: '600',
          fontSize: 16,
          marginBottom: 12,
        },
        radioButton: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          gap: 10,
        },
        radioText: {
          fontSize: 16,
        },
        cancelButton: {
          color: '#0b57d0',
          fontWeight: '600',
          marginTop: 16,
          textAlign: 'center',
        },
      }),
    [theme],
  );

  return styles;
};

export default useModalStyle;

import React from 'react';
import { View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import useInputStyle from '../hooks/useInputStyle';
import Sizes from '../utils/responsive';

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  containerStyle,
  icon,
  iconLib = 'Ionicons',
}) => {
  const styles = useInputStyle();

  const renderIcon = () => {
    if (!icon) return null;

    switch (iconLib) {
      case 'Feather':
        return (
          <Feather
            name={icon}
            size={Sizes.scale(14)}
            color="#999"
            style={[styles.icon, { marginTop: Sizes.scale(5) }]}
          />
        );
      case 'Ionicons':
      default:
        return (
          <Ionicons
            name={icon}
            size={Sizes.scale(15)}
            color="#999"
            style={styles.icon}
          />
        );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        {renderIcon()}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default InputField;

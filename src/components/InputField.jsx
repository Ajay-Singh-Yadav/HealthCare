import React from 'react';
import { View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useInputStyle from '../hooks/useInputStyle';

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  containerStyle,
  icon,
}) => {
  const styles = useInputStyle();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        {icon && (
          <Ionicons name={icon} size={20} color="#999" style={styles.icon} />
        )}
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

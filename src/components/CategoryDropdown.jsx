import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Sizes from '../utils/responsive';

import { useTheme } from '../context/ThemeContext';
import dropdown from '../constant/dropdown';

// const categories = [
//   { label: 'All', value: 'All', icon: 'apps-outline', lib: Ionicons },
//   {
//     label: 'Food & Drinks',
//     value: 'Food & Drinks',
//     icon: 'fast-food-outline',
//     lib: Ionicons,
//   },
//   { label: 'Shopping', value: 'Shopping', icon: 'shopping-bag', lib: Feather },
//   { label: 'Travel', value: 'Travel', icon: 'airplane-outline', lib: Ionicons },
//   {
//     label: 'Entertainment',
//     value: 'Entertainment',
//     icon: 'film-outline',
//     lib: Ionicons,
//   },
//   {
//     label: 'Income',
//     value: 'Income',
//     icon: 'cash-outline',
//     lib: Ionicons,
//   },
//   {
//     label: 'Bill Payments',
//     value: 'Bill Payments',
//     icon: 'file-text',
//     lib: Feather,
//   },
//   { label: 'Rent', value: 'Rent', icon: 'home-outline', lib: Ionicons },
//   {
//     label: "Loan & EMI's",
//     value: 'Loan & EMI',
//     icon: 'credit-card',
//     lib: Feather,
//   },
//   { label: 'Others', value: 'Others', icon: 'apps-outline', lib: Ionicons },
// ];

const CategoryDropdown = ({ selectedCategory, onSelectCategory }) => {
  const { theme } = useTheme();
  const currentValue = selectedCategory === '' ? 'All' : selectedCategory;

  const selectedLabel =
    dropdown.find(item => item.value === currentValue)?.label ?? '';

  const dynamicWidth = Sizes.scale(selectedLabel.length > 8 ? 100 : 75);

  return (
    <Dropdown
      data={dropdown}
      labelField="label"
      valueField="value"
      placeholder="Category"
      value={currentValue}
      onChange={item => {
        if (item.value === 'All') {
          onSelectCategory('');
        } else {
          onSelectCategory(item.value);
        }
      }}
      placeholderStyle={[styles.placeholder, { color: theme.textLight }]}
      selectedTextStyle={[styles.selectedText, { color: theme.text }]}
      containerStyle={styles.dropdownBox}
      style={[
        styles.dropdown,
        {
          width: dynamicWidth,
          borderColor: theme.border,
          backgroundColor: theme.white,
        },
      ]}
      iconStyle={[styles.iconStyle, { tintColor: theme.text }]}
    />
  );
};

export default CategoryDropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    height: Sizes.scale(20),
    borderRadius: Sizes.scale(5),
    zIndex: 1000,
    justifyContent: 'center',
    paddingHorizontal: Sizes.scale(5),
  },
  iconStyle: {
    width: Sizes.scale(16),
    height: Sizes.scale(16),

    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 12,
  },
  dropdownBox: {
    borderRadius: 10,
  },
  selectedText: {
    fontSize: 12,
  },
});

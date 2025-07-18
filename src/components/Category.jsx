import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useCategoryStyle from '../hooks/useCategoryStyle';
import { useTheme } from '../context/ThemeContext';
import Sizes from '../utils/responsive';

import categories from '../constant/categories';

const Category = ({ selectedCategory, onSelectCategory }) => {
  const styles = useCategoryStyle();
  const { theme } = useTheme();

  return (
    <View>
      <View style={styles.categoryContainer}>
        <MaterialIcons
          name="category"
          size={Sizes.scale(18)}
          color={theme.text}
        />
        <Text style={styles.categoryTitle}>Category</Text>
      </View>

      <View style={styles.categoryItem}>
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => {
            const Icon = item.lib;
            const isSelected = selectedCategory === item.name;
            return (
              <TouchableOpacity
                onPress={() => onSelectCategory(item.name)}
                style={[
                  styles.categoryBox,
                  {
                    width: Sizes.scale(item.name.length > 10 ? 130 : 100),
                    backgroundColor: isSelected
                      ? theme.primary
                      : theme.background,
                  },
                ]}
              >
                <Icon
                  name={item.icon}
                  size={Sizes.scale(20)}
                  color={isSelected ? theme.white : theme.text}
                  style={styles.caotegoryIcon}
                />
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? theme.white : theme.text },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Category;

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const getCategoryIcon = (type, category) => {
  if (type.toLowerCase() === 'income') {
    return { name: 'rupee-sign', color: '#fff', Icon: FontAwesome5 };
  }
  switch (category) {
    case 'Food & Drinks':
      return { name: 'fastfood', color: '#fff', Icon: MaterialIcons };
    case 'Travel':
      return { name: 'car', color: '#fff', Icon: FontAwesome5 };
    case 'Entertainment':
      return { name: 'theater-masks', color: '#fff', Icon: FontAwesome5 };
    case 'Loan EMIs':
      return { name: 'money-bill', color: '#fff', Icon: FontAwesome5 };
    case 'Rent':
      return { name: 'home', color: '#fff', Icon: FontAwesome5 };
    case 'Bills':
      return { name: 'file-invoice', color: '#fff', Icon: FontAwesome5 };
    case 'Health Care':
      return { name: 'heartbeat', color: '#fff', Icon: FontAwesome5 };
    case 'Shopping':
      return { name: 'shopping-bag', color: '#fff', Icon: FontAwesome5 };
    case 'Vacation':
      return { name: 'umbrella-beach', color: '#fff', Icon: FontAwesome5 };
    case 'Subscriptions':
      return { name: 'notifications', color: '#fff', Icon: MaterialIcons };
    default:
      return { name: 'th-large', color: '#fff', Icon: FontAwesome5 };
  }
};

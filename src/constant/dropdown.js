// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const dropdown = [
  { label: 'All', value: 'All', icon: 'apps-outline', lib: Ionicons },
  {
    label: 'Food & Drinks',
    value: 'Food & Drinks',
    icon: 'fast-food-outline',
    lib: Ionicons,
  },
  { label: 'Shopping', value: 'Shopping', icon: 'shopping-bag', lib: Feather },
  { label: 'Travel', value: 'Travel', icon: 'airplane-outline', lib: Ionicons },
  {
    label: 'Entertainment',
    value: 'Entertainment',
    icon: 'film-outline',
    lib: Ionicons,
  },
  {
    label: 'Income',
    value: 'Income',
    icon: 'cash-outline',
    lib: Ionicons,
  },
  {
    label: 'Bill Payments',
    value: 'Bill Payments',
    icon: 'file-text',
    lib: Feather,
  },
  { label: 'Rent', value: 'Rent', icon: 'home-outline', lib: Ionicons },
  {
    label: "Loan & EMI's",
    value: 'Loan & EMI',
    icon: 'credit-card',
    lib: Feather,
  },
  {
    label: 'Medical Bills',
    value: 'MedicalBills',
    icon: 'medical-outline',
    lib: Feather,
  },
  { label: 'Others', value: 'Others', icon: 'apps-outline', lib: Ionicons },
];

export default dropdown;

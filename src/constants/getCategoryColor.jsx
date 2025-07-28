const getCategoryColor = (type, category) => {
  if (type.toLowerCase() === 'income') return '#22c55e';

  switch (category) {
    case 'Food & Drinks':
      return '#f43f5e';
    case 'Travel':
      return '#fc034e';
    case 'Movies':
      return '#fc5203';
    case 'Loan EMIs':
      return '#fdba74';
    case 'Rent':
      return '#6203fc';
    case 'Bills':
      return '#03fc52';
    case 'Health':
      return '#03fcfc';
    case 'Shopping':
      return '#fc03fc';
    default:
      return '#a1a1aa'; // fallback color
  }
};

export default getCategoryColor;

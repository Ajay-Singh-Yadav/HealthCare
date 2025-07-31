const getCategoryColor = (type, category) => {
  if (type.toLowerCase() === 'income') return '#22c55e';

  switch (category) {
    case 'Food & Drinks':
      return '#f43f5e';
    case 'Travel':
      return '#fc034e';
    case 'Entertainment':
      return '#fc5203';
    case 'Loan EMIs':
      return '#fdba74';
    case 'Rent':
      return '#6203fc';
    case 'Bills':
      return '#03fc52';
    case 'Health Care':
      return '#03fcfc';
    case 'Shopping':
      return '#fc03fc';
    case 'Vacation':
      return '#87CEEB';
    case 'Subscriptions':
      return '#FF6F00';
    default:
      return '#95A5A6';
  }
};

export default getCategoryColor;

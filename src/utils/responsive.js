// src/utils/responsive.js
import { Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// Get window dimensions (won’t update on rotation, but faster)
const { width, height } = Dimensions.get('window');

// Custom helpers using percentages
const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

// Standard centralized sizes
const Sizes = {
  // Dimensions
  screenWidth: width,
  screenHeight: height,

  // Spacing
  spacingXS: scale(4),
  spacingSM: scale(8),
  spacingMD: scale(16),
  spacingLG: scale(24),
  spacingXL: scale(32),

  // Font sizes
  fontXXS: moderateScale(10),
  fontXS: moderateScale(12),
  fontSM: moderateScale(14),
  fontMD: moderateScale(16),
  fontLG: moderateScale(20),
  fontXL: moderateScale(24),
  fontXXL: moderateScale(28),
  fontXXXL: moderateScale(32),
  fontXXXXL: moderateScale(36),

  // Radius
  radiusSM: scale(6),
  radiusMD: scale(12),
  radiusLG: scale(20),

  // Line heights
  lineHeight: {
    sm: verticalScale(18),
    md: verticalScale(22),
    lg: verticalScale(26),
  },

  // Custom hooks
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
};

export default Sizes;

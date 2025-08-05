import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
export const useResponsiveScale = () => {
  return {
    scale,
    verticalScale,
    moderateScale,
  };
};

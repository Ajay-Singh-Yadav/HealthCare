import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../redux/slice/transactionSlice';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});

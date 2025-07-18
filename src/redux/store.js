import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../redux/slice/transactionSlice';
import userReducer from '../redux/slice/userSlice';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    user: userReducer,
  },
});

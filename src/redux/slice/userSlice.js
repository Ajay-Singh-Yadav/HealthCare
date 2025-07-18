import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  photo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email, photo } = action.payload;
      state.name = name;
      state.email = email;
      state.photo = photo;
    },
    clearUser(state, action) {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },

  reducers: {
    authenticate: (state, action) => {
      state.currentUser = action.payload;
    },

    logout: (state, action) => {
      state.currentUser = null;
    }
  }
});

export const { authenticate, logout } = userSlice.actions;
export default userSlice.reducer;

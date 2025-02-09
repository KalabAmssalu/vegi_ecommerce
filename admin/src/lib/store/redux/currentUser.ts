import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    id: null,
    role: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    address: null,
    token: null,
  },
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    SetCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    ClearCurrentUser: (state) => {
      state.currentUser = initialState.currentUser; // Resets to initial state
    },
  },
});

export const { SetCurrentUser, ClearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

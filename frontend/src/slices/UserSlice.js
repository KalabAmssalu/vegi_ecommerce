import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  role: null,
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  address: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { id, role, firstName, lastName, email, phoneNumber, address, token } = action.payload;
      state.id = id;
      state.role = role;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.address = address;
      state.token = token;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

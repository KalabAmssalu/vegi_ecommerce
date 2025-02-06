import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutUrl: "",
  email: "",
  name: "",
  amount: 0,
  tx_ref: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      state.checkoutUrl = action.payload.checkoutUrl;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.amount = action.payload.amount;
      state.tx_ref = action.payload.tx_ref;
    },
    resetPaymentData: (state) => {
      state.checkoutUrl = "";
      state.email = "";
      state.name = "";
      state.amount = 0;
      state.tx_ref = "";
    },
  },
});

export const { setPaymentData, resetPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;

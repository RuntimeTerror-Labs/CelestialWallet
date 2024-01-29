import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    paymentModal: true,
    newContactModal: false,
  },

  reducers: {
    togglePaymentModal: (state, actions) => {
      state.paymentModal = actions.payload;
    },

    toggleNewContactModal: (state, actions) => {
      state.newContactModal = actions.payload;
    },
  },
});

export const { togglePaymentModal, toggleNewContactModal } = modalSlice.actions;

export default modalSlice.reducer;

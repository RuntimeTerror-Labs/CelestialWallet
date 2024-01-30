import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    paymentModal: false,
    newContactModal: false,
    depositModal: false,
    transferModal: false,
  },

  reducers: {
    togglePaymentModal: (state, actions) => {
      state.paymentModal = actions.payload;
    },

    toggleNewContactModal: (state, actions) => {
      state.newContactModal = actions.payload;
    },

    toggleDepositModal: (state, actions) => {
      state.depositModal = actions.payload;
    },

    toggleTransferModal: (state, actions) => {
      state.transferModal = actions.payload;
    },
  },
});

export const {
  togglePaymentModal,
  toggleNewContactModal,
  toggleDepositModal,
  toggleTransferModal,
} = modalSlice.actions;

export default modalSlice.reducer;

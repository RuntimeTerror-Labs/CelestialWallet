import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    paymentModal: false,
    newContactModal: false,
    depositModal: false,
    transferModal: false,
    nftModal: false,
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

    toggleNftModal: (state, actions) => {
      state.nftModal = actions.payload;
    },
  },
});

export const {
  togglePaymentModal,
  toggleNewContactModal,
  toggleDepositModal,
  toggleTransferModal,
  toggleNftModal,
} = modalSlice.actions;

export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    newContactModal: false,
  },

  reducers: {
    toggleNewContactModal: (state, actions) => {
      state.newContactModal = actions.payload;
    },
  },
});

export const { toggleNewContactModal } = modalSlice.actions;

export default modalSlice.reducer;

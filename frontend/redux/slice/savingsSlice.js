import { createSlice } from "@reduxjs/toolkit";

const savingsSlice = createSlice({
  name: "savings",

  initialState: {
    dialog: false,
    isLoading: false,
    proof: "",
  },

  reducers: {
    handleDialog: (state, actions) => {
      state.dialog = !state.dialog;
    },
    setIsLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },
});

export const { handleDialog, handleStep, setIsLoading, setProof } =
  savingsSlice.actions;

export default savingsSlice.reducer;

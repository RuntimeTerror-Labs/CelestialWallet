import { createSlice } from "@reduxjs/toolkit";

const startSavingSlice = createSlice({
  name: "startSaving",

  initialState: {
    dialog: false,
    step: 0,
    isLoading: false,
    proof: "",
  },

  reducers: {
    handleDialog: (state, actions) => {
      state.dialog = !state.dialog;
    },
    handleStep: (state, actions) => {
      state.step = actions.payload;
    },
    setIsLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },
});

export const { handleDialog, handleStep, setIsLoading, setProof } =
  startSavingSlice.actions;

export default startSavingSlice.reducer;

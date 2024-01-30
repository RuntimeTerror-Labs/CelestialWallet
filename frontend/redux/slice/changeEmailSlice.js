import { createSlice } from "@reduxjs/toolkit";

const changeEmailSlice = createSlice({
  name: "changeEmail",

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
    setProof: (state, actions) => {
      state.proof = actions.payload;
    },
  },
});

export const { handleDialog, handleStep, setIsLoading, setProof } =
  changeEmailSlice.actions;

export default changeEmailSlice.reducer;

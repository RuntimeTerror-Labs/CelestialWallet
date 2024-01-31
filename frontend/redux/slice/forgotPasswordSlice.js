import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",

  initialState: {
    dialog: false,
    steps: 0,
    domain: "",
    isLoading: false,
    address: "",
    proof: null,
  },

  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProof: (state, action) => {
      state.proof = action.payload;
    },
    handleDialog: (state, action) => {
      state.dialog = !state.dialog;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  setSteps,
  setDomain,
  setIsLoading,
  setProof,
  handleDialog,
  setAddress,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;

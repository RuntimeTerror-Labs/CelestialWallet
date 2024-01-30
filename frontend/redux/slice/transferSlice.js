import { createSlice } from "@reduxjs/toolkit";

const transferSlice = createSlice({
  name: "transfer",

  initialState: {
    step: 0,
    amount: "",
    address: "",
    domain: "",
    isLoading: false,
  },

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },

    setAmount: (state, action) => {
      state.amount = action.payload;
    },

    setAddress: (state, action) => {
      state.address = action.payload;
    },

    setDomain: (state, action) => {
      state.domain = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setStep, setAmount, setAddress, setDomain, setIsLoading } =
  transferSlice.actions;

export default transferSlice.reducer;

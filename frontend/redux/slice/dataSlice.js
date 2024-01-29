import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",

  initialState: {
    ethPrice: 0,
    balance: "-.--",
    marketData: [],
  },

  reducers: {
    setEthPrice: (state, actions) => {
      state.ethPrice = actions.payload;
    },
    setBalance: (state, actions) => {
      state.balance = actions.payload;
    },
    setMarketData: (state, actions) => {
      state.marketData = actions.payload;
    },
  },
});

export const { setEthPrice, setBalance, setMarketData } = dataSlice.actions;

export default dataSlice.reducer;

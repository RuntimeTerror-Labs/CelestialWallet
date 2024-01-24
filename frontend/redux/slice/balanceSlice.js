import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",

  initialState: {
    nativeBalance: [],
  },

  reducers: {
    setNativeBalance: (state, action) => {
      state.nativeBalance[action.payload.index] = action.payload.value;
    },
  },
});

export const { setNativeBalance } = balanceSlice.actions;

export default balanceSlice.reducer;

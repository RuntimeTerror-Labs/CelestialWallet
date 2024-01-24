import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",

  initialState: {
    status: "Good",
    owner: "",
    isOwner: false,
    isGuardian: false,
    is2FA: false,
    fnName: "",
    fnArgs: [],
    successMessage: "",
    twoFactorCooldown: 0,
    recentTwoFactor: 0,
  },

  reducers: {
    setWalletStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsOwner: (state, action) => {
      state.isOwner = action.payload;
    },
    setIsGuardian: (state, action) => {
      state.isGuardian = action.payload;
    },
    setIs2FA: (state, action) => {
      state.is2FA = action.payload;
    },
    setFnName: (state, action) => {
      state.fnName = action.payload;
    },
    setFnArgs: (state, action) => {
      state.fnArgs = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setTwoFactorCooldown: (state, action) => {
      state.twoFactorCooldown = action.payload;
    },
    setRecentTwoFactor: (state, action) => {
      state.recentTwoFactor = action.payload;
    },
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
  },
});

export const {
  setWalletStatus,
  setIsOwner,
  setIsGuardian,
  setIs2FA,
  setFnName,
  setFnArgs,
  setSuccessMessage,
  setTwoFactorCooldown,
  setRecentTwoFactor,
  setOwner,
} = walletSlice.actions;

export default walletSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const sigManagerSlice = createSlice({
  name: "sigManager",
  initialState: {
    drawer: false,
    signature: "",
    initiateDrawer: false,
    initiateWalletAddress: "",
    intiateChainId: "",
    messageDrawer: false,
  },

  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },

    closeDrawer: (state) => {
      state.drawer = false;
    },

    setSignature: (state, action) => {
      state.signature = action.payload;
    },

    openInitiateDrawer: (state) => {
      state.initiateDrawer = true;
      state.drawer = true;
    },

    closeInitiateDrawer: (state) => {
      state.initiateDrawer = false;
      state.drawer = false;
    },

    setInitiateWalletAddress: (state, action) => {
      state.initiateWalletAddress = action.payload;
    },

    setInitiateChainId: (state, action) => {
      state.intiateChainId = action.payload;
    },

    openMessageDrawer: (state) => {
      state.messageDrawer = true;
      state.drawer = true;
    },

    closeMessageDrawer: (state) => {
      state.messageDrawer = false;
      state.drawer = false;
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  setSignature,
  toggleSignDrawer,
  openInitiateDrawer,
  closeInitiateDrawer,
  setInitiateWalletAddress,
  setInitiateChainId,
  openMessageDrawer,
  closeMessageDrawer,
} = sigManagerSlice.actions;

export default sigManagerSlice.reducer;

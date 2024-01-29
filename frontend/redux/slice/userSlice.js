import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: { pubKey: "0x31Krpa7vb", username: "Anoy.eth", password: "" },
  },

  reducers: {
    updatePubkey: (state, action) => {
      state.user.pubKey = action.payload;
    },

    updateUsername: (state, action) => {
      state.user.username = action.payload;
    },
    updatePassword: (state, action) => {
      state.user.password = action.payload;
    },
  },
});

export const { updatePubkey, updateUsername, updatePassword } =
  userSlice.actions;

export default userSlice.reducer;

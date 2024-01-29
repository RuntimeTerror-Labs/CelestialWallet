import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: { pubKey: "0x31Krpa7vb", username: "Anoy.eth" },
  },

  reducers: {
    updatePubkey: (state, action) => {
      state.user.pubKey = action.payload;
    },

    updateUsername: (state, action) => {
      state.user.username = action.payload;
    },
  },
});

export const { updatePubkey, updateUsername } = userSlice.actions;

export default userSlice.reducer;

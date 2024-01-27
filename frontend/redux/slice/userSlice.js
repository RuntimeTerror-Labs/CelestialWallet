import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: { pubKey: "0x42Krpa7vb" },
  },

  reducers: {
    updateUser(state, action) {
      state.contacts = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;

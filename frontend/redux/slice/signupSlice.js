import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    step: 0,
  },

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { setStep } = signupSlice.actions;

export default signupSlice.reducer;

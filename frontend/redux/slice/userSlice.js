import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    pkh: null,
  },

  reducers: {
    setPkh: (state, action) => {
      state.pkh = action.payload;
    },
  },
});

export const { setPkh } = userSlice.actions;

export default userSlice.reducer;
